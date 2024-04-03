import { Vector } from "../geometry"
import * as GameObject from "./object"

export const type = "coffee"
export interface Coffee {
    type: typeof type
    position: Vector.t
    zIndex: number
    open: boolean
}

export function make(position: Vector.Vector): Coffee {
    return {
        type: type,
        position: position,
        zIndex: 1,
        open: false,
    }
}

export function isCoffee(obj: GameObject.GameObject): obj is Coffee {
    return obj.type === type
}
