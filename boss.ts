import _ from "lodash"
import * as Direction from "./direction"
import { Vector, moveBy } from "./geometry"
import { GameMap } from "./map"
import * as random from "./random"

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

export function boss_tick(obj: Boss, map: GameMap) {
    switch (obj.state.type) {
        case "instructing":
            break
        case "moving":
            const moves = possibleMoves(obj.position, obj.state.direction, map)

            if (moves.turn || moves.straight) {
                const move_choice = random.choice<keyof MoveActions>(
                    _.compact([moves.turn ? "turn" : null, moves.straight ? "straight" : null]),
                    _.compact([moves.turn ? 1 : null, moves.straight ? 2 : null])
                )
                switch (move_choice) {
                    case "turn":
                        const chosen = random.choice(moves.turn!.directions)
                        obj.state.direction = chosen
                    case "straight":
                        const new_pos = moveBy(obj.position, obj.state.direction)
                        map.move(obj, new_pos)
                }
                return
            }

            if (moves.back || moves.jump) {
                const move_choice = random.choice<keyof MoveActions>(
                    _.compact([moves.back ? "back" : null, moves.jump ? "jump" : null]),
                    _.compact([moves.back ? 1 : null, moves.jump ? 2 : null])
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
                map.move(
                    obj,
                    moveBy(moveBy(obj.position, obj.state.direction), obj.state.direction)
                )
                obj.state = {
                    type: "moving",
                    direction: obj.state.direction,
                    tact: 0,
                }
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
