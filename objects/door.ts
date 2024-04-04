import { Vector } from "@/geometry"
import config from "@/game/config"
import { GameObject } from "@/objects"

const type = "door"
export interface Door {
    type: typeof type
    position: Vector.t
    zIndex: number
    open: boolean
    placed: boolean
}

export function isDoor(obj: GameObject.GameObject): obj is Door {
    return obj.type === type
}

export function make(position: Vector.t): Door {
    return {
        type: type,
        position: position,
        zIndex: config.items.door.zIndex,
        open: false,
        placed: false,
    }
}
