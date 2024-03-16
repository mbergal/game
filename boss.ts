import _ from "lodash"
import * as Direction from "./direction"
import { Vector, moveBy } from "./geometry"
import { GameMap } from "./map"
import * as random from "./random"
import { Footprint } from "./footprint"

type Stopped = { type: "stopped"; previous_direction: Direction.t | null }
type Moving = { type: "moving"; direction: Direction.t; tact: 0 | 1 }
type Instructing = { type: "instructing" }
type Jumping = { type: "jumping"; direction: Direction.t; tact: number }
type BossState = Stopped | Moving | Instructing | Jumping

export interface Boss extends LiveObject {
    type: "boss"
    position: Vector
    state: BossState
    zIndex: number
}

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

export type MoveActions = {
    turn?: { directions: Direction.t[] }
    straight?: {}
    jump?: { directions: Direction.t[] }
    back?: {}
}

export function possibleMoves(
    pos: Vector,
    currentDirection: Direction.t,
    map: GameMap
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
        result.straight = {}
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

function move(obj: Boss, new_pos: Vector, new_direction: Direction.t, map: GameMap) {
    obj.state = { type: "moving", direction: new_direction, tact: 0 }
    map.add([{ type: "footprint", position: obj.position, zIndex: 1, tact: 0 } as Footprint])
    map.move(obj, new_pos)
}

export function tick(obj: Boss, map: GameMap) {
    switch (obj.state.type) {
        case "instructing":
            break
        case "moving":
            const moves = possibleMoves(obj.position, obj.state.direction, map)

            // First, check if we can move forward
            if (moves.turn || moves.straight) {
                const move_types: (keyof MoveActions | null)[] = [
                    moves.turn ? "turn" : null,
                    moves.straight ? "straight" : null,
                ]
                const move_weights = [
                    moves.turn ? BOSS_WEIGHTS.turn.notVisited : null,
                    moves.straight
                        ? map.isAt(moveBy(obj.position, obj.state.direction), "footprint")
                            ? BOSS_WEIGHTS.straight.visited
                            : BOSS_WEIGHTS.straight.notVisited
                        : null,
                ]
                if (moves.turn) {
                    console.log(JSON.stringify({ move_types, move_weights }))
                    debugger
                }

                const move_choice = random.choice<keyof MoveActions>(
                    _.compact(move_types),
                    _.compact(move_weights)
                )
                switch (move_choice) {
                    case "turn":
                        const weights = moves.turn!.directions.map((x) =>
                            map.isAt(moveBy(obj.position, x), "footprint")
                                ? BOSS_WEIGHTS.turn.visited
                                : BOSS_WEIGHTS.turn.notVisited
                        )
                        const chosen = random.choice(moves.turn!.directions, weights)
                        obj.state.direction = chosen
                    case "straight":
                        const new_pos = moveBy(obj.position, obj.state.direction)
                        move(obj, new_pos, obj.state.direction, map)
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
                        obj.state.direction = Direction.reverse(obj.state.direction)
                        break
                    case "jump":
                        obj.state = { type: "jumping", direction: obj.state.direction, tact: 0 }
                        break
                }
            }
            break
        case "jumping":
            obj.state = {
                type: "jumping",
                direction: obj.state.direction,
                tact: obj.state.tact + 1,
            }
            if (obj.state.tact > 4) {
                move(
                    obj,
                    moveBy(moveBy(obj.position, obj.state.direction), obj.state.direction),
                    obj.state.direction,
                    map
                )
            }
            break
        case "stopped": {
            const direction = choose_direction(obj.position, null, map)
            if (direction != null) obj.state = { type: "moving", direction, tact: 0 }
            break
        }
    }
}

function choose_direction(
    pos: Vector,
    least_preferred: Direction.t | null,
    map: GameMap
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
