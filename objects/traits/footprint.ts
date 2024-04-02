import { Effects, GameMap } from "@/game"
import { Vector } from "@/geometry"
import * as GameObject from "../object"

export type Footprint = {
    position: Vector.t
    zIndex: number
    tact: number
    lifetime: number
}

export function tick<T extends Footprint & GameObject.t>(
    obj: T,
    map: GameMap.GameMap,
): Effects.Effects {
    if (obj.tact > obj.lifetime) {
        map.remove([obj])
    } else {
        obj.tact += 1
    }
    return []
}

export function leaveFootprint<T extends Footprint & GameObject.t>(
    position: Vector.Vector,
    map: GameMap.GameMap,
    make: (position: Vector.Vector) => T,
) {
    const existingFootprint = map.objAt(position, "developer.footprint")
    if (existingFootprint) {
        map.remove(existingFootprint)
    }
    const footprint = make(position)
    map.add([footprint])
    return footprint
}
