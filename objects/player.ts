import _ from "lodash"
import { Command } from "../commands"
import { Game } from "../game"
import * as Effect from "../game/effect"
import * as Effects from "../game/effects"
import { GameMap } from "../game/map"
import * as Messages from "../game/messages"
import { Vector, moveBy } from "../geometry"
import * as Direction from "../geometry/direction"
import { assertUnreachable } from "../utils/utils"
import * as GameObject from "./object"
import { Item } from "./object"
import { StoryTask, Task } from "./tasks"

export interface Player {
    type: "player"
    position: Vector.Vector
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

export interface Result {}

export function make(position: Vector.Vector): Player {
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

function canMoveOn(objs: GameObject.t[]) {
    if (objs.length > 0) {
        const canMoveOnObj = (obj: GameObject.t) => {
            switch (obj.type) {
                case "door":
                case "story":
                case "footprint":
                case "commit":
                case "coffee":
                    return true
                case "player":
                case "wall":
                case "boss":
                    return false
                default:
                    assertUnreachable(obj)
            }
        }
        const result = _.every(objs, canMoveOnObj)
        return result
    } else {
        return true
    }
}

function canTakeTask(task: Task, player: Player) {
    return player.task == null
}

function takeTask(player: Player, task: Task, game: Game.t) {
    player.task = task
    switch (task.type) {
        case "story":
            Game.message(game, Messages.startedStory(task.story))
            break
        case "null":
            break
        default:
            assertUnreachable(task)
    }
}

function canPickItem(player: Player) {
    return player.hrTaskTact == null
}

function pickItem(player: Player, newItem: Item, game: Game.t): Effects.t {
    const effects: Effects.t = []
    game.map.remove(newItem)
    switch (newItem.type) {
        case "door":
        case "coffee":
            dropCarriedItem(player, game)
            player.item = newItem
            break
        case "commit":
            if (player.task) {
                const task = player.task
                switch (task.type) {
                    case "story":
                        Effects.append(effects, StoryTask.addCommit(player, task, newItem))
                        break
                }
            } else {
                dropCarriedItem(player, game)
                player.item = newItem
            }

            break
        case "story":
            player.task = StoryTask.make(newItem)
            break
        default:
            assertUnreachable(newItem)
    }
    return effects
}

function dropCarriedItem(player: Player, game: Game.t) {
    const carriedItem = player.item
    if (carriedItem != null) {
        // player.item.position = moveBy(
        //     player.position,
        //     Direction.reverse(player.direction!)
        // )
        dropItem(player, game.map)
    }
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
        dropItem(player, map)
    }
}

function dropItem(player: Player, map: GameMap) {
    const droppingItem = player.item!
    droppingItem.open = true
    droppingItem.position = player.position
    map.add(droppingItem)
    player.item = null
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
export function tick(player: Player, game: Game.t, commands: Command[]): Effect.t[] {
    tickHrTask(player)
    processCommands(player, commands, game.map)

    const result: Effect.t[] = []
    if (player.direction) {
        const newPosition = moveBy(player.position, player.direction)
        const objsAtNewPosition = game.map.at(newPosition)
        if (canMoveOn(objsAtNewPosition)) {
            if (objsAtNewPosition.length > 0) {
                const obj = objsAtNewPosition[0]
                switch (obj.type) {
                    case "door":
                    case "coffee":
                        if (canPickItem(player)) {
                            console.log(`Can pick item  ${JSON.stringify(player)}`)
                            result.push(Effect.showMessage(`Picked a ${obj.type}`, 40))
                            Effects.append(result, pickItem(player, obj, game))
                        }
                        break
                    case "commit":
                        if (canPickItem(player)) {
                            console.log(`Can pick item  ${JSON.stringify(player)}`)
                            Effects.append(
                                result,
                                Effect.showMessage(`Picked a commit ${obj.hash}`, 40)
                            )
                            Effects.append(result, pickItem(player, obj, game))
                        }
                        break
                    case "story":
                        const task: StoryTask.t = StoryTask.make(obj)

                        if (canTakeTask(task, player)) {
                            takeTask(player, task, game)
                            game.map.remove(obj)
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
            game.map.move(player, newPosition)
        } else {
        }
    }
    return result
}
