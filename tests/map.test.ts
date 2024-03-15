import { expect, test, describe } from "vitest"
import { GameMap } from "../map"
import _ from "lodash"
import { Wall } from "../wall"
import { loadMap } from "./utils"

export function sum(a: number, b: number) {
    return a + b
}

describe("forks", () => {
    test("adds 1 + 2 to equal 3", () => {
        const map = loadMap(`
        ---------
        |   |   |
        ---------
        |   |   |
        ---------
        `)
        expect(map.possibleDirections({ x: 0, y: 0 }, "wall")).toEqual({
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
