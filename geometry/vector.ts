export type Vector = {
    readonly x: number
    readonly y: number
}

export type Repr = string

export type t = Vector

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

export function equals(v1: Vector, v2: Vector): boolean {
    return v1.x === v2.x && v1.y === v2.y
}

export const zero = { x: 0, y: 0 }

export function repr(v: Vector): Repr {
    return v ? `(${v.x}, ${v.y})` : "null"
}
