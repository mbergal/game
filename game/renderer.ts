import { Game, GameMap, Message } from "."
import { Vector } from "../geometry"
import { GameObject, Item } from "@/objects"
import { Format } from "@/utils"
import { assertUnreachable } from "@/utils"
import config from "./config"
import { DayOfWeek } from "./day_of_week"

export function render(game: Game.Game) {
    const map = game.map
    let buffer = [showMessage(game)]
    buffer = buffer.concat(renderMap(map, game.time.ticks))

    buffer.push(
        showTime(game) +
            showLevel(game) +
            showFlags(game) +
            "|Money: " +
            Format.currency(game.score.money).padStart(6, " ") +
            "|Impact: " +
            game.score.impact.toString().padStart(3, " ") +
            showTask(game) +
            showItems(game.score.generatedItems) +
            "|" +
            showStockPrice(game),
    )

    return buffer.map((x) => x)
}

function itemIcon(item: Item.Item): string {
    switch (item.type) {
        case "door":
            return "["
        case "commit":
            return ";"
        case "coffee":
            return "☕"
        case "pr_review":
            return "r"
        case "story":
            return ""
        default:
            return assertUnreachable(item)
    }
}

function showItems(items: GameObject.GameObject[]): string {
    return "| " + items.filter(Item.isItem).map(itemIcon).join("")
}

export function renderMapRect(
    map: GameMap.GameMap,
    tick: number,
    rect: { position: Vector.Vector; size: Vector.Vector },
): string[] {
    const rendered = renderMap(map, tick)
    const subRect = []
    for (let y = rect.position.y; y < rect.position.y + rect.size.y; y++) {
        subRect.push(rendered[y].substring(rect.position.x, rect.position.x + rect.size.x))
    }
    return subRect
}

export function renderMap(map: GameMap.GameMap, tick: number): string[] {
    const buffer: string[] = []
    for (let y = 0; y < map.height; y++) {
        const row = []

        for (let x = 0; x < map.width; x++) {
            const objs = map.cells[y][x]
            row.push(getRepresentation(map, objs, tick))
        }

        buffer.push(row.join(""))
    }
    return buffer
}

export function showMessage(game: {
    messages: Message.Message[]
    messageStartTime: number | null
}): string {
    if (game.messages.length > 0) {
        if (game.messageStartTime == null) {
            game.messageStartTime = Date.now()
        }
        if (Date.now() - game.messageStartTime.valueOf() > game.messages[0].ttl) {
            game.messageStartTime = null
            game.messages.shift()
        } else if (
            Date.now().valueOf() - game.messageStartTime.valueOf() >
                config.messages.showNextMessageAfter &&
            game.messages.length > 1
        ) {
            game.messageStartTime = null
            game.messages.shift()
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

function showFlags(game: Game.Game): string {
    return "| " + (game.player!.speedUp ? "⚡" : " ")
}

function showTask(game: Game.Game): string {
    const task = game.player!.task
    if (task != null) {
        switch (task.type) {
            case "story":
                return `|Story ${task.appliedCommits}/${task.neededCommits}`
        }
    }
    return ""
}

function showStockPrice(game: Game.Game): string {
    return `🗠: $${game.score.stockPrice.toFixed(2)} ▼`
}
function isVisible(obj: GameObject.GameObject): boolean {
    switch (obj.type) {
        case "boss":
        case "wall":
        case "player":
        case "coffee":
        case "story":
        case "commit":
        case "door":
        case "developer":
            return true
        case "pr_review":
            return config.items.prReview.visible
        case "boss.footprint":
            return config.boss.footprint.visible
        case "developer.footprint":
            return config.developer.footprint.visible
        case "developer.pathlights":
            return config.developer.pathlights.visible
        default:
            assertUnreachable(obj)
    }
    return true
}

function blink(a: string, b: string, tick: number) {
    return tick % 10 < 5 ? a : b
}
function getRepresentation(
    map: GameMap.GameMap,
    objs: GameObject.GameObject[],
    tick: number,
): string {
    let obj = objs.find(isVisible)
    if (obj) {
        switch (obj.type) {
            case "wall":
                return getWallRepresentation(map, obj.position)
            case "boss":
                return "+"
            case "boss.footprint":
                return "■"
            case "developer.footprint":
                return "◆"
            case "developer.pathlights":
                return "·"
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
                            case "pr_review":
                                return blink("r", "*", tick)
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
            case "pr_review":
                return "r"
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
