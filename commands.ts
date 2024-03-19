import * as Direction from "./geometry/direction"

export type MoveCommand = {
    type: "move"
    direction: Direction.t
}

export function isMoveCommand(command: Command): command is MoveCommand {
    return command.type == "move"
}

export type StopCommand = {
    type: "stop"
}

export type DropCommand = {
    type: "drop"
}

export type Command = MoveCommand | StopCommand | DropCommand
