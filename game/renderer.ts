import { Game, GameMap, Message } from "."
import { Vector } from "../geometry"
import { GameObject } from "../objects"
import { assertUnreachable } from "../utils/utils"
import config from "./config"
import { DayOfWeek } from "./day_of_week"

export function render(game: Game.Game) {
    const map = game.map
    const buffer = [showMessage(game)]
    for (let y = 0; y < map.height; y++) {
        const row = []

        for (let x = 0; x < map.width; x++) {
            const objs = map.cells[y][x]
            row.push(getRepresentation(map, objs, game.time.ticks))
        }

        buffer.push(row.join(""))
    }

    buffer.push(
        showTime(game) +
            showLevel(game) +
            "|Money: $" +
            game.score.money.toString().padStart(6, "0") +
            "|Impact: " +
            game.score.impact.toString().padStart(3, " ") +
            showTask(game) +
            "|" +
            showStockPrice(game),
    )
    return buffer.map((x) => x)
}

export function showMessage(game: {
    messages: Message.Message[]
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
            Date.now().valueOf() - game.messageStartTime.valueOf() >
                config.messages.showNextMessageAfter &&
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

function shortDay(day: DayOfWeek): string {
    switch (day) {
        case "Monday":
            return "Mon"
        case "Tuesday":
            return "Tue"
        case "Wednesday":
            return "Wed"
        case "Thursday":
            return "Thu"
        case "Friday":
            return "Fri"
        case "Saturday":
            return "Sat"
        case "Sunday":
            return "Sun"
        default:
            return assertUnreachable(day)
    }
}

function showTime(game: Game.Game): string {
    return (
        "Day:" +
        (game.time.day + 1).toString() +
        "/" +
        shortDay(game.time.dayOfWeek) +
        " " +
        (game.sprint ? game.sprint.daysLeft : " ")
    )
}

function showLevel(game: Game.Game): string {
    return "|Pos:" + game.player!.level.name
}

function showTask(game: Game.Game): string {
    const task = game.player!.task
    if (task != null) {
        switch (task.type) {
            case "story":
                return `Story ${task.appliedCommits}/${task.neededCommits}`
        }
    }
    return ""
}

function showStockPrice(game: Game.Game): string {
    return `🗠: $${game.score.stockPrice.toFixed(2)} ▼`
}
function isVisible(obj: GameObject.t) {
    switch (obj.type) {
        case "boss":
        case "wall":
        case "player":
        case "coffee":
        case "story":
        case "commit":
        case "door":
        case "developer":
        case "developer.footprint":
            return true
        case "boss_footprint":
            return true
        default:
            assertUnreachable(obj)
    }
    return true
}

function blink(a: string, b: string, tick: number) {
    return tick % 10 < 5 ? a : b
}
function getRepresentation(map: GameMap.GameMap, objs: GameObject.t[], tick: number): string {
    let obj = objs.find(isVisible)
    if (obj) {
        switch (obj.type) {
            case "wall":
                return getWallRepresentation(map, obj.position)
            case "boss":
                return "+"
            case "boss_footprint":
                return "■"
            case "developer.footprint":
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
                                return blink(";", "*", tick)
                            case "coffee":
                                return blink("c", "*", tick)
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
                return obj.open ? ";" : "."
            case "coffee":
                return obj.open ? "c" : "."
            case "developer":
                return "D"
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

function getWallRepresentation(map: GameMap.GameMap, pos: Vector.Vector) {
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
        map.someObjectsAt(Vector.w(pos), "wall")
    ) {
        return "╢"
    } else if (
        pos.x == 0 &&
        pos.y != 0 &&
        pos.y != map.height - 1 &&
        map.someObjectsAt(Vector.e(pos), "wall")
    ) {
        return "╟"
    } else if (pos.x == 0 || pos.x == map.width - 1) {
        return "║"
    } else if (pos.y == 0 || pos.y == map.height - 1) {
        return "═"
    } else if (
        map.someObjectsAt(Vector.n(pos), "wall") &&
        map.someObjectsAt(Vector.s(pos), "wall")
    ) {
        return "│"
    } else if (map.someObjectsAt(Vector.s(pos), "wall")) {
        return "┬"
    } else if (map.someObjectsAt(Vector.n(pos), "wall")) {
        return "┴"
    } else {
        return "─"
    }
}
