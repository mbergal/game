import * as Direction from "./geometry/direction"

export type MoveCommand = {
    type: "move"
    direction: Direction.t
}

export type Command = MoveCommand
