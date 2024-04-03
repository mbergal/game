import _ from "lodash"
import { GameMap } from "../game"
import { Vector } from "../geometry"
import { Wall } from "../objects/wall"

function removeEmptyLines(str: string) {
    return str.split(/\r?\n/)
}

export function loadMap(s: string): [GameMap.GameMap, Map<string, Vector.Vector>] {
    const marks = new Map<string, Vector.Vector>()
    const trimmed = removeEmptyLines(s)
        .map((x) => x.trim())
        .filter((x) => x != "")
    const height = trimmed.length
    const width = _.max(trimmed.map((x) => x.length)) ?? 0

    const map = new GameMap.GameMap(width, height, [])
    for (const y of _.range(trimmed.length)) {
        for (const x of _.range(trimmed[y].length)) {
            switch (trimmed[y][x]) {
                case "=":
                case "-":
                case "|":
                    map.add([{ type: "wall", position: { x, y }, zIndex: 0 } as Wall])
                    break
                default:
                    marks.set(trimmed[y][x], { x, y })
                    break
            }
        }
    }
    return [map, marks]
}
