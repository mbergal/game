import { GameMap } from "@/game"
import { describe, expect, test } from "vitest"
import { loadMap } from "../utils"

export function sum(a: number, b: number) {
    return a + b
}

describe("forks", () => {
    test("adds 1 + 2 to equal 3", () => {
        const [map, _] = loadMap(`
        ---------
        |   |   |
        ---------
        |   |   |
        ---------
        `)
        expect(map.possibleDirections({ x: 0, y: 0 }, GameMap.Predicates.has("wall"))).toEqual({
            down: {
                x: 0,
                y: 1,
            },
            right: {
                x: 1,
                y: 0,
            },
        })
    })
})
