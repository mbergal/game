import { Vector } from "./geometry"
import { GameMap } from "./game/map"
import { GameObject } from "./objects/object"
import { assertUnreachable } from "./utils/utils"

export function render(map: GameMap) {
    const buffer = []
    for (let y = 0; y < map.height; y++) {
        const row = []

        for (let x = 0; x < map.width; x++) {
            const objs = map.cells[y][x]
            row.push(getRepresentation(map, objs))
        }

        buffer.push(row)
    }

    const contentBlock = document.getElementById("content")
    contentBlock!.innerText = buffer.map((x) => x.join("")).join("\n")
}

function isVisible(obj: GameObject) {
    switch (obj.type) {
        case "boss":
        case "wall":
        case "player":
            return true
        case "footprint":
            return false

        default:
            assertUnreachable(obj)
    }
    return true
}
function getRepresentation(map: GameMap, objs: GameObject[]): string {
    let obj = objs.find(isVisible)
    if (obj) {
        const t = obj.type
        switch (t) {
            case "wall":
                return getWallRepresentation(map, obj.position)
            case "boss":
                return "+"
            case "footprint":
                return "■"
            case "player":
                return "*"
            default:
                assertUnreachable(t)
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
