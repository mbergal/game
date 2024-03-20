import * as Story from "../story"
import config from "../../game/config"

export interface t {
    type: "story"
    size: Story.Size
    impact: number
    neededCommits: number
    appliedCommits: number
}

export interface StoryTask extends t {}

export function make(size: Story.Size): t {
    return {
        type: "story",
        size: size,
        impact: config.story[size].impact,
        neededCommits: config.story[size].neededCommits,
        appliedCommits: 0,
    }
}
