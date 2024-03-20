import { Vector } from "../geometry"
import * as StorySize from "./story_size"

export { Size } from "./story_size"

export interface t {
    type: "story"
    position: Vector.t
    size: StorySize.Size
    zIndex: number
}

export interface Story extends t {}

export function make(position: Vector.t, size: StorySize.Size): Story {
    return {
        type: "story",
        position: position,
        size: size,
        zIndex: 1,
    }
}
