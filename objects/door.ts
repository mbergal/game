import { Vector } from "../geometry"

export interface t {
    type: "door"
    position: Vector.t
    zIndex: 1
    open: boolean
    placed: boolean
}

export interface Door extends t {}

export function make(position: Vector.t): t {
    return {
        type: "door",
        position: position,
        zIndex: 1,
        open: false,
        placed: false,
    }
}
