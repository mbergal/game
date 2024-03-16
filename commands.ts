import * as Direction from "./direction"

export type MoveCommand = {
    type: "move"
    direction: Direction.t
}

export type Command = MoveCommand
