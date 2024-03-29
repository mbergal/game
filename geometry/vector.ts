export type Vector = {
    readonly x: number
    readonly y: number
}

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

export const zero = { x: 0, y: 0 }
