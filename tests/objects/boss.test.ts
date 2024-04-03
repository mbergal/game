import { test, expect } from "vitest"
import { loadMap } from "../utils"
import { possibleMoves } from "../../objects/boss"

test("possibleMoves", () => {
    const [map, _] = loadMap(`
        ---------
        |   |   |
        ---------
        |   |   |
        ---- ----
        |   |   |
        ---------
        `)

    expect(possibleMoves({ x: 0, y: 0 }, "right", map)).toEqual({
        turn: { directions: ["down"] },
        straight: {},
    })

    expect(possibleMoves({ y: 2, x: 4 }, "right", map)).toEqual({
        turn: { directions: ["down", "up"] },
        straight: {},
        back: {},
    })
    expect(possibleMoves({ y: 4, x: 3 }, "right", map)).toEqual({
        back: {},
        jump: { directions: ["right"] },
    })
})
