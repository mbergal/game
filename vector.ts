export interface t {
    x: number
    y: number
}

export function n(v: t): t {
    return { x: v.x, y: v.y - 1 }
}

export function s(v: t): t {
    return { x: v.x, y: v.y + 1 }
}

export function w(v: t): t {
    return { x: v.x - 1, y: v.y }
}

export function e(v: t): t {
    return { x: v.x + 1, y: v.y }
}
