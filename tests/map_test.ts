import { expect, test, describe } from "vitest"
import { GameMap } from "../game/map"

export function sum(a: number, b: number) {
    return a + b
}

function loadMap(s: string): GameMap {}

describe("forks", () => {
    test("adds 1 + 2 to equal 3", () => {
        const map = loadMap(`
        ---------
        |   |   |
        ---------
        |   |   |
        ---------
        `)
        expect(sum(1, 2)).toBe(3)
    })
})
