export interface Vector {
    x: number
    y: number
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
