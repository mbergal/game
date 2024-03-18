import * as Direction from "../geometry/direction"
import { Command } from "../commands"
import { Vector, moveBy } from "../geometry"
import { GameMap } from "../game/map"
import { GameObject } from "./object"

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

export interface Result {
    codeBlocks: number
}

export function canMoveOn(objs: GameObject[]) {
    if (objs.length > 0)
        switch (objs[0].type) {
            case "item":
                return true
            default:
                return false
        }
    else {
        return true
    }
}
export function tick(obj: Player, map: GameMap, commands: Command[]): Result {
    obj.commands = [...obj.commands, ...commands.map((x) => ({ command: x, tact: 0 }))]

    if (obj.commands.length > 0) {
        console.log(JSON.stringify(obj.commands))
        switch (obj.commands[0].command.type) {
            case "move":
                const newPosition = moveBy(obj.position, obj.commands[0].command.direction)
                const obsjAtNewPosition = map.at(newPosition)
                if (canMoveOn(obsjAtNewPosition)) {
                    obj.direction = obj.commands[0].command.direction
                    obj.commands.pop()
                } else {
                }
                break
        }
        for (const c of obj.commands) {
            c.tact += 1
        }

        obj.commands = obj.commands.filter((x) => x.tact < 10)
    }

    const result: Result = {
        codeBlocks: 0,
    }
    if (obj.direction) {
        const newPosition = moveBy(obj.position, obj.direction)
        const objsAtNewPosition = map.at(newPosition)
        if (canMoveOn(objsAtNewPosition)) {
            if (objsAtNewPosition.length > 0) {
                switch (objsAtNewPosition[0].type) {
                    case "item":
                        map.remove(objsAtNewPosition[0])
                        result.codeBlocks += 1
                }
            }
            map.move(obj, newPosition)
        } else {
        }
    }
    return result
}
