import { Effects, GameMap } from "@/game"
import { Vector } from "@/geometry"
import { GameObject } from "@/objects"

export interface Footprint<T> {
    tick(t: T): number
    setTick(t: T, tick: number): void
    lifetime(t: T): number
}

export function make<T extends GameObject.GameObject>(footprint: Footprint<T>) {
    return {
        tick(obj: T, map: GameMap.GameMap): Effects.Effects {
            if (footprint.tick(obj) > footprint.lifetime(obj)) {
                map.remove([obj])
            } else {
                footprint.setTick(obj, footprint.tick(obj) + 1)
            }
            return []
        },

        leaveFootprint(
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
        },
    }
}
