import { Vector } from "@/geometry"

export const type = "developer.pathlights"

export type Pathlights = {
    type: "developer.pathlights"
    position: Vector.Vector
    zIndex: number
}

export function make(position: Vector.Vector): Pathlights {
    return {
        type: "developer.pathlights",
        position: position,
        zIndex: 1,
    }
}

export function isPathlights(obj: any): obj is Pathlights {
    return obj.type === type
}
