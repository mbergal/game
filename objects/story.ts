import { Vector } from "../geometry"

export interface t {
    type: "story"
    position: Vector.t
    size: Size
    zIndex: number
}

export interface Story extends t {}

export enum Size {
    small,
    medium,
    large,
}

export function toString(size: Size) {
    switch (size) {
        case Size.small:
            return "small"
        case Size.medium:
            return "medium"
        case Size.large:
            return "large"
    }
}

export function make(position: Vector.t, size: Size): Story {
    return {
        type: "story",
        position: position,
        size: size,
        zIndex: 1,
    }
}
