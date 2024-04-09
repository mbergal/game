import { expect, test } from "vitest"
import { loadMap } from "../utils"
import { bfs } from "@/traits/targeting"
import { GameMap } from "@/game"

test("bfs", () => {
    const [map, b] = loadMap(`
        ---------
        |   |  e|
        ----- ---
        | |   | |
        --- ----
        |b  |   |
        ---------
        `)

    expect(
        bfs(
            (v) => map.possibleDirections(v, GameMap.Predicates.doesNotHave("wall")),
            b.get("b")!,
            b.get("e")!,
        ),
    ).toEqual([
        { x: 1, y: 5 },
        { x: 2, y: 5 },
        { x: 3, y: 5 },
        { x: 3, y: 4 },
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 },
        { x: 5, y: 2 },
        { x: 5, y: 1 },
        { x: 6, y: 1 },
        { x: 7, y: 1 },
    ])
})
