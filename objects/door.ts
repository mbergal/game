import { Vector } from "../geometry"

export interface Door {
    type: "door"
    position: Vector.t
    zIndex: 1
    open: boolean
}

export function make(position: Vector.t): Door {
    return {
        type: "door",
        position: position,
        zIndex: 1,
        open: false,
    }
}
