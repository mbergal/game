import { Vector } from "@/geometry"

export const type = "developer.pathlights"

export type Pathlight = {
    type: "developer.pathlights"
    position: Vector.Vector
    zIndex: number
}

export function make(position: Vector.Vector): Pathlight {
    return {
        type: "developer.pathlights",
        position: position,
        zIndex: 1,
    }
}

export function isPathlight(obj: any): obj is Pathlight {
    return obj.type === type
}
