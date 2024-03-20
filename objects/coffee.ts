import { Vector } from "../geometry"

export interface t {
    type: "coffee"
    position: Vector.t
    zIndex: number
    open: boolean
}

export type Coffee = t

export function make(position: Vector.t): t {
    return {
        type: "coffee",
        position: position,
        zIndex: 1,
        open: false,
    }
}
