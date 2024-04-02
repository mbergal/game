import { GameMap, Effects } from "@/game"
import * as FootprintTrait from "../traits/footprint"

const LIFETIME = 1000

export type Footprint = FootprintTrait.Footprint & {
    type: "boss_footprint"
}

export function tick(obj: Footprint, map: GameMap.GameMap): Effects.Effects {
    if (obj.tact > LIFETIME) {
        map.remove([obj])
    } else {
        obj.tact += 1
    }
    return []
}
