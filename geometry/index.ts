import * as Direction from "./direction"
import * as Vector from "./vector"

export * as Direction from "./direction"
export * as Vector from "./vector"

export function moveTo(vector: Vector.Vector, direction: Direction.t | null): Vector.Vector {
    if (direction == null) {
        return vector
    } else {
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
}

export function directionTo(vector: Vector.Vector, target: Vector.Vector): Direction.t | null {
    if (Vector.equals(vector, target)) return null
    else if (Vector.equals(Vector.n(vector), target)) return "up"
    else if (Vector.equals(Vector.s(vector), target)) return "down"
    else if (Vector.equals(Vector.w(vector), target)) return "left"
    else if (Vector.equals(Vector.e(vector), target)) return "right"
    else {
        return null
    }
}
