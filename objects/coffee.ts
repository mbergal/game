import { Vector } from "../geometry"

export interface Coffee {
    type: "coffee"
    position: Vector.t
    zIndex: number
    open: boolean
}

export function make(position: Vector.Vector): Coffee {
    return {
        type: "coffee",
        position: position,
        zIndex: 1,
        open: false,
    }
}
