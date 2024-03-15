import { Vector } from "./geometry"

export interface Footprint {
    type: "footprint"
    position: Vector
    zIndex: number
    tact: number
}
