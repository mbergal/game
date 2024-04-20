import { Vector } from "../geometry"

export interface Wall {
    type: "wall"
    position: Vector.Vector
    zIndex: number
}

export function make(position: Vector.Vector): Wall {
    return {
        type: "wall",
        position: position,
        zIndex: 0,
    }
}
