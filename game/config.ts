import * as StorySize from "../objects/story_size"

export type Config = {
    boss: {
        TACTS_FOR_SINGLE_MOVE: number
        TACTS_FOR_JUMP: number
    }
    story: Record<StorySize.Size, { neededCommits: number; impact: number }>
}

const config: Config = {
    boss: {
        TACTS_FOR_JUMP: 3,
        TACTS_FOR_SINGLE_MOVE: 4 * 3,
    },
    story: {
        [StorySize.Size.small]: { neededCommits: 2, impact: 1 },
        [StorySize.Size.medium]: { neededCommits: 5, impact: 2 },
        [StorySize.Size.large]: { neededCommits: 8, impact: 4 },
    },
}

export default config
