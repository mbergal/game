import { Direction, Vector } from "../geometry"

export interface Item {
    type: "item"
    position: Vector.t
    zIndex: number
}

export interface ItemGenerator {
    tact: number
}

export function make(position: Vector.t): Item {
    return {
        type: "item",
        position: position,
        zIndex: 1,
    }
}
