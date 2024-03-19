import * as Direction from "../geometry/direction"
import * as Story from "./story"
import { Command, isMoveCommand } from "../commands"
import { Vector, moveBy } from "../geometry"
import { GameMap } from "../game/map"
import { GameObject, Item } from "./object"
import { assertUnreachable } from "../utils/utils"

interface StoryTask {
    type: "story"
    size: Story.Size
    neededCommits: number
    appliedCommits: number
}

type Task = StoryTask

export interface Player {
    type: "player"
    position: Vector.t
    direction: Direction.t | null
    zIndex: number
    tact: number
    hrTaskTact: number | null
    task: Task | null
    commands: {
        command: Command
        tact: number
    }[]
    item: Item | null
}

export interface Result {
    codeBlocks: number
}

export function make(position: Vector.t): Player {
    return {
        type: "player",
        zIndex: 1000,
        direction: null,
        position: position,
        tact: 0,
        commands: [],
        hrTaskTact: null,
        item: null,
        task: null,
    }
}

function canMoveOn(objs: GameObject[]) {
    if (objs.length > 0) {
        const obj = objs[0]
        switch (obj.type) {
            case "door":
            case "story":
            case "commit":
                return true
            default:
                return false
        }
    } else {
        return true
    }
}

function canTakeTask(task: Task, player: Player) {
    return true
}

function takeTask(player: Player, task: Task, map: GameMap) {
    player.task = task
}

function canPickItem(player: Player) {
    return player.hrTaskTact == null
}

function pickItem(player: Player, item: Item, map: GameMap) {
    map.remove(item)
    switch (item.type) {
        case "door":
        case "commit":
            break
        case "story":
            player.task = {
                type: "story",
                size: item.size,
                neededCommits: 10,
                appliedCommits: 0,
            }
            break
        default:
            assertUnreachable(item)
    }

    player.item = item
}

function tickHrTask(player: Player) {
    if (player.hrTaskTact != null) {
        player.hrTaskTact += 1
        if (player.hrTaskTact > 200) {
            player.hrTaskTact = null
        }
    }
}

function handleDrop(player: Player, map: GameMap) {
    if (player.item != null) {
        const droppingItem = player.item
        droppingItem.open = true
        droppingItem.position = player.position
        map.add(droppingItem)
        player.item = null
    }
}
function processCommands(player: Player, commands: Command[], map: GameMap) {
    // const moveCommands = commands.filter(isMoveCommand)
    // const otherCommands = commands.filter((x) => !isMoveCommand(x))

    player.commands = [...player.commands, ...commands.map((x) => ({ command: x, tact: 0 }))]

    // if (otherCommands.length > 0) {

    // }
    if (player.commands.length > 0) {
        console.log(JSON.stringify(player.commands))
        switch (player.commands[0].command.type) {
            case "move":
                const newPosition = moveBy(player.position, player.commands[0].command.direction)
                const obsjAtNewPosition = map.at(newPosition)
                if (canMoveOn(obsjAtNewPosition)) {
                    player.direction = player.commands[0].command.direction
                    player.commands.pop()
                } else {
                }
                break
            case "stop":
                player.commands = []
                player.direction = null
                break
            case "drop":
                handleDrop(player, map)
                break
        }
        for (const c of player.commands) {
            c.tact += 1
        }

        player.commands = player.commands.filter((x) => x.tact < 10)
    }
}
export function tick(player: Player, map: GameMap, commands: Command[]): Result {
    tickHrTask(player)
    processCommands(player, commands, map)

    const result: Result = {
        codeBlocks: 0,
    }
    if (player.direction) {
        const newPosition = moveBy(player.position, player.direction)
        const objsAtNewPosition = map.at(newPosition)
        if (canMoveOn(objsAtNewPosition)) {
            if (objsAtNewPosition.length > 0) {
                const obj = objsAtNewPosition[0]
                switch (obj.type) {
                    case "door":
                    case "commit":
                        if (canPickItem(player)) {
                            pickItem(player, obj, map)
                            result.codeBlocks += 1
                        }
                        break
                    case "story":
                        const task: StoryTask = {
                            type: "story",
                            size: obj.size,
                            neededCommits: 10,
                            appliedCommits: 0,
                        }
                        if (canTakeTask(task, player)) {
                            takeTask(player, task, map)
                            map.remove(obj)
                        }
                        break
                    case "player":
                    case "wall":
                    case "boss":
                    case "footprint":
                        break
                    default:
                        assertUnreachable(obj)
                }
            }
            map.move(player, newPosition)
        } else {
        }
    }
    return result
}
