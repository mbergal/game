import { GameMap, Effects } from "@/game"
import * as FootprintTrait from "../traits/footprint"
import { Vector } from "@/geometry"

const LIFETIME = 1000

export const type = "developer.footprint"

export type Footprint = FootprintTrait.Footprint & {
    type: typeof type
}

export function make(position: Vector.Vector): Footprint {
    return {
        type: "developer.footprint",
        position: position,
        zIndex: 1,
        tact: 0,
        lifetime: LIFETIME,
    }
}

export function tick(obj: Footprint, map: GameMap.GameMap): Effects.Effects {
    if (obj.tact > LIFETIME) {
        map.remove([obj])
    } else {
        obj.tact += 1
    }
    return []
}
