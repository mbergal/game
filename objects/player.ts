import * as Direction from "../geometry/direction"
import { Command } from "../commands"
import { Vector, moveBy } from "../geometry"
import { GameMap } from "../game/map"

export interface Player {
    type: "player"
    position: Vector.t
    direction: Direction.t | null
    zIndex: number
    tact: number
    commands: {
        command: Command
        tact: number
    }[]
}

export function tick(obj: Player, map: GameMap, commands: Command[]) {
    obj.commands = [...obj.commands, ...commands.map((x) => ({ command: x, tact: 0 }))]

    if (obj.commands.length > 0) {
        console.log(JSON.stringify(obj.commands))
        switch (obj.commands[0].command.type) {
            case "move":
                const newPosition = moveBy(obj.position, obj.commands[0].command.direction)
                const obsjAtNewPosition = map.at(newPosition)
                if (obsjAtNewPosition.length > 0) {
                } else {
                    obj.direction = obj.commands[0].command.direction
                    obj.commands.pop()
                }
                break
        }
        for (const c of obj.commands) {
            c.tact += 1
        }

        obj.commands = obj.commands.filter((x) => x.tact < 10)
    }

    if (obj.direction) {
        const newPosition = moveBy(obj.position, obj.direction)
        const obsjAtNewPosition = map.at(newPosition)
        if (obsjAtNewPosition.length > 0) {
        } else {
            map.move(obj, newPosition)
        }
    }
}
