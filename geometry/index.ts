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

export function line(start: Vector.t, direction: Vector.t, size: number): Vector.t[] {
    const line_vector = []
    for (let i = 0; i < size; ++i) {
        line_vector.push({
            x: start.x + i * direction.x,
            y: start.y + i * direction.y,
        })
    }
    return line_vector
}

export function hline(start: Vector.t, size: number): Vector.t[] {
    return line(start, { x: 1, y: 0 }, size)
}

export function vline(start: Vector.t, size: number): Vector.t[] {
    return line(start, { x: 0, y: 1 }, size)
}
