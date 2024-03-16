import { Vector } from "../geometry"

export interface Wall {
    type: "wall"
    position: Vector
    zIndex: number
}
