import * as Direction from "./direction"
export interface Vector {
    x: number
    y: number
}

export const AllDirections: Direction.t[] = ["left", "right", "down", "up"]

export function moveBy(vector: Vector, direction: Direction.t): Vector {
    switch (direction) {
        case "down":
            return { ...vector, x: vector.x, y: vector.y + 1 }
        case "up":
            return { ...vector, x: vector.x, y: vector.y - 1 }
        case "left":
            return { ...vector, x: vector.x - 1, y: vector.y }
        case "right":
            return { ...vector, x: vector.x + 1, y: vector.y }
    }
}

export function n(v: Vector): Vector {
    return { x: v.x, y: v.y - 1 }
}

export function s(v: Vector): Vector {
    return { x: v.x, y: v.y + 1 }
}

export function w(v: Vector): Vector {
    return { x: v.x - 1, y: v.y }
}

export function e(v: Vector): Vector {
    return { x: v.x + 1, y: v.y }
}
