import { Vector } from "@/geometry"
import { Traits } from ".."

const LIFETIME = 1000

export type Footprint = {
    type: "boss.footprint"
    position: Vector.Vector
    zIndex: number
    tick: number
}

export const footprint: Traits.Footprint.Footprint<Footprint> = {
    tick: (t) => t.tick,
    setTick: (t, tick) => {
        t.tick = tick
    },
    lifetime: () => LIFETIME,
}
