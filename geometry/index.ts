import * as Direction from "./direction"
import * as Vector from "./vector"

export * as Direction from "./direction"
export * as Vector from "./vector"

export function moveBy(vector: Vector.t, direction: Direction.t): Vector.t {
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
