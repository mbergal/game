import { Vector } from "@/geometry"
import * as Traits from "@/traits"
import config from "@/game/config"

const LIFETIME = 1000

export type Footprint = {
    type: "boss.footprint"
    position: Vector.Vector
    zIndex: number
    tick: number
}

export function make(position: Vector.Vector): Footprint {
    return {
        type: "boss.footprint",
        position: position,
        zIndex: config.boss.footprint.zIndex,
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
