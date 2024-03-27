import _ from "lodash"
import * as Direction from "../geometry/direction"
import { Vector, moveBy } from "../geometry"
import { GameMap } from "../game"
import * as random from "../utils/random"
import { Footprint } from "./footprint"
import { Player } from "./player"
import config from "../game/config"

type Stopped = { type: "stopped"; previous_direction: Direction.t | null }
type Moving = { type: "moving"; direction: Direction.t; tact: 0 | 1 }
type Instructing = { type: "instructing" }
type Jumping = { type: "jumping"; direction: Direction.t; tact: number }
type BossState = Stopped | Moving | Instructing | Jumping

export interface t extends LiveObject {
    type: "boss"
    position: Vector.t
    state: BossState
    zIndex: number
}

export type Boss = t

let BOSS_WEIGHTS = {
    turn: {
        visited: 0.2,
        notVisited: 1,
    },
    straight: {
        visited: 0.2,
        notVisited: 3,
    },
    back: 1.0,
    jump: 5.0,
}

BOSS_WEIGHTS = {
    turn: {
        visited: 0.000001,
        notVisited: 1,
    },
    straight: {
        visited: 0.0000001,
        notVisited: 3,
    },
    back: 0.0000001,
    jump: 5.0,
}

export function make(): t {
    return {
        position: {
            x: 0,
            y: 0,
        },
        type: "boss",
        zIndex: 10,
        state: { type: "stopped", previous_direction: null },
    }
}

export type MoveActions = {
    turn?: { directions: Direction.t[] }
    straight?: { direction: Direction.t }
    jump?: { directions: Direction.t[] }
    back?: {}
}

export function possibleMoves(
    pos: Vector.t,
    currentDirection: Direction.t,
    map: GameMap.GameMap
): MoveActions {
    const result: MoveActions = {}
    const possible = map.possibleDirections(pos, "wall")
    const turns = _.difference(possible, [
        currentDirection,
        Direction.reverse(currentDirection),
    ]) as Direction.t[]

    if (turns.length > 0) {
        result.turn = { directions: turns }
    }

    if (_.includes(possible, currentDirection)) {
        result.straight = { direction: currentDirection }
    }

    if (
        !_.includes(possible, currentDirection) &&
        !map.isAt(moveBy(pos, currentDirection), "wall")
    ) {
        result.jump = { directions: [currentDirection] }
    }

    if (_.includes(possible, Direction.reverse(currentDirection))) {
        result.back = {}
    }

    return result
}

function move(obj: Boss, new_pos: Vector.t, new_direction: Direction.t, map: GameMap.GameMap) {
    obj.state = { type: "moving", direction: new_direction, tact: 0 }
    map.add([{ type: "footprint", position: obj.position, zIndex: 1, tact: 0 } as Footprint.t])
    map.move(obj, new_pos)
}

function pipPlayer(obj: Boss, player: Player) {
    player.hrTaskTact = 0
}

export function tick(boss: Boss, map: GameMap.GameMap) {
    switch (boss.state.type) {
        case "instructing":
            break
        case "moving":
            // First check if there is a player to instruct
            const directionToPlayer = GameMap.directionTo(boss.position, map, "player")
            if (directionToPlayer) {
                const player = map.objAt(moveBy(boss.position, directionToPlayer), "player")!

                if (player) pipPlayer(boss, player)
            }

            boss.state.tact += 1
            if (boss.state.tact < config.boss.TACTS_FOR_SINGLE_MOVE) {
                return
            }

            const moves = possibleMoves(boss.position, boss.state.direction, map)

            // First, check if we can move forward
            if (moves.turn || moves.straight) {
                const move_types: (keyof MoveActions | null)[] = [
                    moves.turn ? "turn" : null,
                    moves.straight ? "straight" : null,
                ]
                const move_weights = [
                    moves.turn ? BOSS_WEIGHTS.turn.notVisited : null,
                    moves.straight
                        ? map.isAt(moveBy(boss.position, boss.state.direction), "footprint")
                            ? BOSS_WEIGHTS.straight.visited
                            : BOSS_WEIGHTS.straight.notVisited
                        : null,
                ]
                if (moves.turn) {
                    console.log(JSON.stringify({ move_types, move_weights }))
                    // debugger
                }

                const move_choice = random.choice<keyof MoveActions>(
                    _.compact(move_types),
                    _.compact(move_weights)
                )
                switch (move_choice) {
                    case "turn":
                        const weights = moves.turn!.directions.map((x) =>
                            map.isAt(moveBy(boss.position, x), "footprint")
                                ? BOSS_WEIGHTS.turn.visited
                                : BOSS_WEIGHTS.turn.notVisited
                        )
                        const chosen = random.choice(moves.turn!.directions, weights)
                        boss.state.direction = chosen
                    case "straight":
                        const new_pos = moveBy(boss.position, boss.state.direction)
                        move(boss, new_pos, boss.state.direction, map)
                }
                return
            }
            // Then check if we need to jump or have to move back
            if (moves.back || moves.jump) {
                const move_choice = random.choice<keyof MoveActions>(
                    _.compact([moves.back ? "back" : null, moves.jump ? "jump" : null]),
                    _.compact([moves.back ? BOSS_WEIGHTS.back : null, BOSS_WEIGHTS.jump ? 5 : null])
                )
                switch (move_choice) {
                    case "back":
                        boss.state.direction = Direction.reverse(boss.state.direction)
                        break
                    case "jump":
                        boss.state = { type: "jumping", direction: boss.state.direction, tact: 0 }
                        break
                }
            }
            break
        case "jumping":
            boss.state = {
                type: "jumping",
                direction: boss.state.direction,
                tact: boss.state.tact + 1,
            }
            if (boss.state.tact > config.boss.TACTS_FOR_JUMP) {
                move(
                    boss,
                    moveBy(moveBy(boss.position, boss.state.direction), boss.state.direction),
                    boss.state.direction,
                    map
                )
            }
            break
        case "stopped": {
            const direction = choose_direction(boss.position, null, map)
            if (direction != null) boss.state = { type: "moving", direction, tact: 0 }
            break
        }
    }
}

function choose_direction(
    pos: Vector.t,
    least_preferred: Direction.t | null,
    map: GameMap.GameMap
): Direction.t | null {
    const forks = map.possibleDirections(pos, "wall")
    const b = forks.filter((x) => x[0] != least_preferred)

    if (b.length != 0) {
        const direction = random.choice(b)
        return direction
    } else {
        return least_preferred
    }
}
