import { Vector } from "../geometry"
import { GameMap } from "../map"

const LIFETIME = 1000

export interface Footprint {
    type: "footprint"
    position: Vector
    zIndex: number
    tact: number
}

export function tick(obj: Footprint, map: GameMap) {
    if (obj.tact > LIFETIME) {
        map.remove([obj])
    } else {
        obj.tact += 1
    }
}
