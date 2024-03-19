import { Vector } from "../geometry"

export interface t {
    type: "story"
    position: Vector.t
    size: Size
    zIndex: number
}

export type Story = t

export enum Size {
    small,
    medium,
    large,
}

export function make(position: Vector.t, size: Size): Story {
    return {
        type: "story",
        position: position,
        size: size,
        zIndex: 1,
    }
}
