import { Vector, n, s } from "./geometry";
import { GameMap } from "./map";
import { GameObject } from "./object";
import { assertUnreachable } from "./utils";

export function render(map: GameMap) {
    debugger
    const buffer = [];
    for (let y = 0; y < map.height; y++) {
        const row = [];

        for (let x = 0; x < map.width; x++) {
            const objs = map.cells[y][x]
            if (objs.length) {
                switch (objs[0].type) {
                    case "wall":
                        row.push(getWallRepresentation(map, { x, y }))
                        break
                    default:
                        row.push(getRepresentation(map, objs[0]))
                        break
                }
            } else
                row.push(" ");
        }

        buffer.push(row);
    }


    const contentBlock = document.getElementById("content")
    contentBlock.innerText = buffer.map(x => x.join("")).join("\n")

}

function getRepresentation(map: GameMap, obj: GameObject): string {
    const t = obj.type;
    switch (t) {
        case "wall":
            if (map.isAt(n(obj.position), "wall") && map.isAt(s(obj.position), "wall")) {
                return "|";
            }
            else
                return "-";
        case "boss":
            return "*";
        default:
            assertUnreachable(t);
    }

}

function getWallRepresentation(map: GameMap, pos: Vector) {
    if (pos.x == 0 && pos.y == 0) {
        return "╔"
    } else if (pos.x == 0 && pos.y == map.height - 1) {
        return "╚"
    }
    else if (pos.x == map.width - 1 && pos.y == 0) {
        return "╗"
    }
    else if (pos.x == map.width - 1 && pos.y == map.height - 1) {
        return "╝"
    }
    else if (pos.x == 0 || pos.x == map.width - 1) {
        return "║"
    }
    else if (pos.y == 0 || pos.y == map.height - 1) {
        return "═"
    }
    else if (map.isAt(n(pos), "wall") && map.isAt(s(pos), "wall")) {
        return "│"
    }
    else if (map.isAt(s(pos), "wall")) {
        return "┬"
    }
    else if (map.isAt(n(pos), "wall")) {
        return "┴"
    }
    else {
        return "─"
    }
}
