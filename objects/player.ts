import * as Logging from "@/utils/logging"
import { assertUnreachable } from "@/utils/utils"
import _ from "lodash"
import * as Command from "../command"
import { Effect, Effects, EngineeringLevels, Game, Messages, GameMap } from "../game"
import config from "../game/config"
import { Vector, moveBy } from "../geometry"
import * as Direction from "../geometry/direction"
import * as Item from "./item"
import * as GameObject from "./object"
import { StoryTask, Task } from "./tasks"

const logger = Logging.make("player")

type PlayerFlags = {
    spedUp: false | number
}

export type Player = {
    type: "player"
    position: Vector.t
    direction: Direction.t | null
    zIndex: number
    tact: number
    hrTaskTact: number | null
    task: Task | null
    flags: PlayerFlags
    level: EngineeringLevels.EngineeringLevel
    commands: {
        command: Command.Command
        tact: number
    }[]
    item: GameObject.Item | null
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
        flags: {
            spedUp: false,
        },
        level: EngineeringLevels.all[0],
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

function takeTask(player: Player, task: Task, game: Game.Game) {
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

function canPickItem(player: Player, item: GameObject.Item) {
    switch (item.type) {
        case "door":
            if (item.placed) {
                return false
            }
    }
    return player.hrTaskTact == null
}

function useItem(
    player: Player,
    item: GameObject.Item,
    map: GameMap.GameMap,
    effects: Effect.Effect[],
): boolean {
    logger(`Using item ${item.type}`)
    switch (item.type) {
        case "commit":
            if (player.task) {
                const task = player.task
                switch (task.type) {
                    case "story":
                        StoryTask.addCommit(player, task, item, effects)
                        player.item = null
                        Effects.append(
                            effects,
                            Effect.showMessage(
                                `Added commit ${item.hash} to PR "${task.story.name}" `,
                                3_000,
                            ),
                        )
                        break
                }

                return true
            } else {
                Effects.append(effects, Effect.showMessage("No task to apply commit to", 3_000))
                return false
            }
        case "coffee":
            Effects.append(effects, Effect.showMessage("Drinking coffee", 3_000))
            player.flags.spedUp = config.items.coffee.speedUpDays * config.dayTicks
            player.item = null
            return true
        case "door":
            Effects.append(effects, Effect.showMessage("Placing door", 3_000))
            item.position = player.position
            map.add(item)

            item.placed = true
            player.item = null
            return true
        case "story":
            break
        default:
            assertUnreachable(item)
    }
    return false
}

function pickItem(
    player: Player,
    newItem: GameObject.Item,
    game: Game.Game,
    effects: Effects.Effects,
): boolean {
    game.map.remove(newItem)
    switch (newItem.type) {
        case "door":
            newItem.open = true
            dropCarriedItem(player, game, effects)
            player.item = newItem
            effects.push(Effect.showMessage(`Picked ${Item.description(newItem)}`, 3_000))
            return true
        case "coffee":
            dropCarriedItem(player, game, effects)
            player.item = newItem
            effects.push(Effect.showMessage(`Picked ${Item.description(newItem)}`, 3_000))
            return true
        case "commit":
            dropCarriedItem(player, game, effects)
            player.item = newItem
            effects.push(Effect.showMessage(`Picked ${Item.description(newItem)}`, 3_000))
            return true
        case "story":
            player.task = StoryTask.make(newItem)
            effects.push(Effect.showMessage(`Picked ${Item.description(newItem)}`, 3_000))
            return false
        default:
            assertUnreachable(newItem)
    }
}

function dropCarriedItem(player: Player, game: Game.Game, effects: Effects.Effects) {
    const carriedItem = player.item
    if (carriedItem != null) {
        dropItem(player, game.map)
        Effects.append(
            effects,
            Effect.showMessage(`Dropped ${Item.description(carriedItem)}`, 3_000),
        )
    }
}

function tickHrTask(player: Player, ticksPassed: number) {
    if (player.hrTaskTact != null) {
        player.hrTaskTact += ticksPassed
        if (player.hrTaskTact > 200) {
            player.hrTaskTact = null
        }
    }
}

function tickFlags(player: Player, ticksPassed: number) {
    if (player.flags.spedUp) {
        player.flags.spedUp -= ticksPassed
        if (player.flags.spedUp <= 0) {
            player.flags.spedUp = false
        }
    }
}

function handleDrop(player: Player, map: GameMap.GameMap) {
    if (player.item != null) {
        dropItem(player, map)
    }
}

function dropItem(player: Player, map: GameMap.GameMap) {
    const droppingItem = player.item!
    droppingItem.open = true
    droppingItem.position = player.position
    map.add(droppingItem)
    player.item = null
}

function processCommands(
    player: Player,
    commands: Command.Command[],
    map: GameMap.GameMap,
    effects: Effects.Effects,
) {
    const removeAllMoves = () => {
        player.commands = player.commands.filter((x) => x.command.type != "move")
    }

    player.commands = [...player.commands, ...commands.map((x) => ({ command: x, tact: 0 }))]

    if (player.commands.length > 0) {
        logger(JSON.stringify(player.commands))
    }
    if (player.commands.length > 0 && player.commands.some((x) => x.command.type != "move")) {
        logger(JSON.stringify(player.commands))
    }

    let delayedCommands: {
        command: Command.Command
        tact: number
    }[] = []
    while (player.commands.length > 0) {
        logger(JSON.stringify(player.commands))
        const command = player.commands[0].command
        logger(`processing: ${JSON.stringify(command)}`)
        switch (command.type) {
            case "move":
                const newPosition = moveBy(player.position, command.direction)
                const obsjAtNewPosition = map.at(newPosition)
                if (canMoveOn(obsjAtNewPosition)) {
                    player.direction = command.direction
                    player.commands.shift()
                    delayedCommands = []
                } else {
                    const delayedCommand = player.commands.shift()!
                    logger(`delaying ${JSON.stringify(delayedCommand)}`)
                    delayedCommands.push(delayedCommand)
                }
                break
            case "stop":
                removeAllMoves()
                player.direction = null
                break
            case "drop":
                handleDrop(player, map)
                player.commands.shift()
                removeAllMoves()
                break
            case "use":
                if (player.item != null) {
                    useItem(player, player.item!, map, effects)
                }
                player.commands.shift()
                removeAllMoves()
                break
            default:
                assertUnreachable(command)
        }
    }

    player.commands = delayedCommands
    for (const c of player.commands) {
        c.tact += 1
    }

    player.commands = player.commands.filter((x) => x.tact < 10)
}

export function tick(
    player: Player,
    game: Game.Game,
    commands: Command.Command[],
    ticksPassed: number,
): Effects.Effects {
    const effects: Effects.Effects = []
    let pickedSomething = false
    let carriedSomething = player.item != null

    tickHrTask(player, ticksPassed)
    tickFlags(player, ticksPassed)
    processCommands(player, commands, game.map, effects)

    if (player.direction) {
        const newPosition = moveBy(player.position, player.direction)
        const objsAtNewPosition = game.map.at(newPosition)
        if (canMoveOn(objsAtNewPosition)) {
            if (objsAtNewPosition.length > 0) {
                const obj = objsAtNewPosition[0]
                switch (obj.type) {
                    case "door":
                    case "coffee":
                        if (canPickItem(player, obj)) {
                            logger(`Can pick item  ${JSON.stringify(player)}`)
                            Effects.append(effects, Effect.showMessage(`Picked a ${obj.type}`, 40))
                            pickedSomething =
                                pickedSomething || pickItem(player, obj, game, effects)
                        }
                        break
                    case "commit":
                        if (canPickItem(player, obj)) {
                            logger(`Can pick item  ${JSON.stringify(player)}`)
                            Effects.append(
                                effects,
                                Effect.showMessage(`Picked a commit ${obj.hash}`, 40),
                            )
                            pickedSomething =
                                pickedSomething || pickItem(player, obj, game, effects)
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
            if (
                game.map.objAt(moveBy(newPosition, player.direction), "commit") &&
                carriedSomething
            ) {
                player.direction = null
            }
        } else {
        }
    }
    return effects
}
