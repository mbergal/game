import { Vector } from "@/geometry"
import * as Traits from "@/traits"

const LIFETIME = 1000

export const type = "developer.footprint"

export type Footprint = {
    type: typeof type
    position: Vector.Vector
    zIndex: number
    tick: number
}

export function make(position: Vector.Vector): Footprint {
    return {
        type: "developer.footprint",
        position: position,
        zIndex: 1,
        tick: 0,
    }
}

export const footprint: Traits.Footprint.Footprint<Footprint> = {
    tick: (t) => t.tick,
    setTick: (t, tick) => {
        t.tick = tick
    },
    lifetime: () => LIFETIME,
}
