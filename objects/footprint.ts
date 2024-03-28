import { Vector } from "../geometry"
import { GameMap } from "../game/map"

const LIFETIME = 1000

export interface Footprint {
    type: "footprint"
    position: Vector.t
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
