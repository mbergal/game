import { Game } from "./game"
import { EngineeringLevels } from "./game/levels"
import { GameMap } from "./game/map"
import * as Message from "./game/message"
import { Vector } from "./geometry"
import { t } from "./objects/object"
import { assertUnreachable } from "./utils/utils"

export function render(game: Game.t) {
    const map = game.map
    const buffer = [showMessage(game).split("")]
    for (let y = 0; y < map.height; y++) {
        const row = []

        for (let x = 0; x < map.width; x++) {
            const objs = map.cells[y][x]
            row.push(getRepresentation(map, objs, game.time.ticks))
        }

        buffer.push(row)
    }

    buffer.push(
        (
            showTicks(game) +
            showLevel(game) +
            " Money: $" +
            game.score.money.toString().padStart(6, "0") +
            " Impact: " +
            game.score.impact.toString().padStart(3, " ") +
            showTask(game) +
            " " +
            showStockPrice(game)
        ).split("")
    )
    const contentBlock = document.getElementById("content")
    contentBlock!.innerText = buffer.map((x) => x.join("")).join("\n")
}

export function showMessage(game: {
    messages: Message.t[]
    messageStartTime: number | null
}): string {
    if (game.messages.length > 0) {
        if (game.messageStartTime == null) {
            game.messageStartTime = Date.now()
        }
        let text = game.messages[0].text
        if (Date.now() - game.messageStartTime.valueOf() > game.messages[0].ttl) {
            game.messageStartTime = Date.now()
            game.messages.shift()
        } else if (
            Date.now().valueOf() - game.messageStartTime.valueOf() > 3000 &&
            game.messages.length > 1
        ) {
            game.messageStartTime = Date.now()
            game.messages.shift()
        } else {
            return text
        }

        return game.messages.length > 0 ? game.messages[0].text : ""
    } else {
        return ""
    }
}

function showTicks(game: Game.t): string {
    return (
        // game.time.ticks.toString().padStart(6, "0") +
        // " " +
        game.time.day.toString() + " " + game.time.dayOfWeek + " " + game.sprint?.day
    )
}

function showLevel(game: Game.t): string {
    return " " + EngineeringLevels.all[game.score.level].name
}

function showTask(game: Game.t): string {
    const task = game.player!.task
    if (task != null) {
        switch (task.type) {
            case "story":
                return `Story ${task.appliedCommits}/${task.neededCommits}`
        }
    }
    return ""
}

function showStockPrice(game: Game.t): string {
    return `🗠: $${game.score.stockPrice.toFixed(2)} ▼`
}
function isVisible(obj: t) {
    switch (obj.type) {
        case "boss":
        case "wall":
        case "player":
        case "coffee":
        case "story":
        case "commit":
        case "door":
            return true
        case "footprint":
            return false
        default:
            assertUnreachable(obj)
    }
    return true
}

function blink(a: string, b: string, tick: number) {
    return tick % 10 < 5 ? a : b
}
function getRepresentation(map: GameMap, objs: t[], tick: number): string {
    let obj = objs.find(isVisible)
    if (obj) {
        switch (obj.type) {
            case "wall":
                return getWallRepresentation(map, obj.position)
            case "boss":
                return "+"
            case "footprint":
                return "■"
            case "player":
                if (obj.hrTaskTact) {
                    return blink("*", "@", tick)
                } else {
                    if (obj.item != null) {
                        const item = obj.item
                        switch (item.type) {
                            case "door":
                                return blink("]", "*", tick)
                            case "commit":
                                return blink("ε", "*", tick)
                            case "coffee":
                                return tick % 10 < 5 ? "C" : "*"
                            case "story":
                                return ""
                            default:
                                return assertUnreachable(item)
                        }
                    }
                    return "*"
                }
            case "door":
                return obj.open ? (obj.placed ? "]" : "[") : "."
            case "commit":
                return obj.open ? "ε" : "."
            case "coffee":
                return obj.open ? "c" : "."
            case "story":
                switch (obj.size) {
                    case "small":
                        return "s"
                    case "medium":
                        return "m"
                    case "large":
                        return "l"
                }
            default:
                assertUnreachable(obj)
        }
    } else {
        return " "
    }
}

function getWallRepresentation(map: GameMap, pos: Vector.Vector) {
    if (pos.x == 0 && pos.y == 0) {
        return "╔"
    } else if (pos.x == 0 && pos.y == map.height - 1) {
        return "╚"
    } else if (pos.x == map.width - 1 && pos.y == 0) {
        return "╗"
    } else if (pos.x == map.width - 1 && pos.y == map.height - 1) {
        return "╝"
    } else if (
        pos.x == map.width - 1 &&
        pos.y != 0 &&
        pos.y != map.height - 1 &&
        map.isAt(Vector.w(pos), "wall")
    ) {
        return "╢"
    } else if (
        pos.x == 0 &&
        pos.y != 0 &&
        pos.y != map.height - 1 &&
        map.isAt(Vector.e(pos), "wall")
    ) {
        return "╟"
    } else if (pos.x == 0 || pos.x == map.width - 1) {
        return "║"
    } else if (pos.y == 0 || pos.y == map.height - 1) {
        return "═"
    } else if (map.isAt(Vector.n(pos), "wall") && map.isAt(Vector.s(pos), "wall")) {
        return "│"
    } else if (map.isAt(Vector.s(pos), "wall")) {
        return "┬"
    } else if (map.isAt(Vector.n(pos), "wall")) {
        return "┴"
    } else {
        return "─"
    }
}
