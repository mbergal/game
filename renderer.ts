import { Vector } from "./geometry"
import { GameMap } from "./game/map"
import { GameObject } from "./objects/object"
import { assertUnreachable } from "./utils/utils"
import { Game } from "./game"
import * as EngineeringLevel from "./game/levels"
import * as Message from "./game/message"
import { Size } from "./objects/story"
import config from "./game/config"

export function render(game: Game.t) {
    const map = game.map
    const buffer = [showMessage(game).split("")]
    for (let y = 0; y < map.height; y++) {
        const row = []

        for (let x = 0; x < map.width; x++) {
            const objs = map.cells[y][x]
            row.push(getRepresentation(map, objs, game.ticks))
        }

        buffer.push(row)
    }

    buffer.push(
        (
            showTicks(game) +
            showLevel(game) +
            "    Money: $" +
            game.score.money.toString().padStart(6, "0") +
            " " +
            // "*:" +
            // (game.player?.hrTaskTact ? "P" : "") +
            // " " +
            showTask(game) +
            " " +
            showStockPrice(game)
        ).split("")
    )
    const contentBlock = document.getElementById("content")
    contentBlock!.innerText = buffer.map((x) => x.join("")).join("\n")
}

export function showMessage(game: { messages: Message.t[]; messageTact: number }): string {
    if (game.messages.length > 0) {
        game.messageTact += 1
        let text = game.messages[0].text
        if (game.messageTact > game.messages[0].ttl) {
            game.messageTact = 0
            game.messages.shift()
        } else if (game.messageTact > 5 && game.messages.length > 1) {
            game.messageTact = 0
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
    return game.ticks.toString().padStart(6, "0")
}

function showLevel(game: Game.t): string {
    return " " + EngineeringLevel.all[game.score.level].name
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
    return `Company Stock Price: $${((config.totalTicks - game.ticks) / 100).toFixed(2)} ▼`
}
function isVisible(obj: GameObject) {
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
function getRepresentation(map: GameMap, objs: GameObject[], tick: number): string {
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
                    return tick % 10 < 5 ? "*" : "@"
                } else {
                    if (obj.item != null) {
                        const item = obj.item
                        switch (item.type) {
                            case "door":
                                return "]"
                            case "commit":
                                return "ε"
                            case "coffee":
                                return "C"
                            case "story":
                                return ""
                            default:
                                return assertUnreachable(item)
                        }
                    }
                    return "*"
                }
            case "door":
                return obj.open ? "]" : "."
            case "door":
                return "["
            case "commit":
                return obj.open ? "ε" : "."
            case "coffee":
                return obj.open ? "c" : "."
            case "story":
                switch (obj.size) {
                    case Size.small:
                        return "s"
                    case Size.medium:
                        return "m"
                    case Size.large:
                        return "l"
                }
            default:
                assertUnreachable(obj)
        }
    } else {
        return " "
    }
}

function getWallRepresentation(map: GameMap, pos: Vector.t) {
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
