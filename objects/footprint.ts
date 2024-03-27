import { Vector } from "../geometry"
import { GameMap } from "../game/map"

export namespace Footprint {
    const LIFETIME = 1000

    export interface Footprint {
        type: "footprint"
        position: Vector.t
        zIndex: number
        tact: number
    }

    export type t = Footprint

    export function tick(obj: Footprint, map: GameMap) {
        if (obj.tact > LIFETIME) {
            map.remove([obj])
        } else {
            obj.tact += 1
        }
    }
}
