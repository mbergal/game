import * as StorySize from "../objects/story_size"

export type Config = {
    boss: {
        TACTS_FOR_SINGLE_MOVE: number
        TACTS_FOR_JUMP: number
    }
    story: Record<StorySize.Size, { neededCommits: number; impact: number }>
    totalTicks: number
    performanceReview: {
        interval: number
    }
    sprint: {
        interval: number
        grooming: number
        start: number
    }
    tickInterval: number
    itemGenerator: { start: number; interval: number }
}

const config: Config = {
    tickInterval: 100,
    boss: {
        TACTS_FOR_JUMP: 3,
        TACTS_FOR_SINGLE_MOVE: 4 * 3,
    },
    story: {
        [StorySize.Size.small]: { neededCommits: 2, impact: 1 },
        [StorySize.Size.medium]: { neededCommits: 5, impact: 2 },
        [StorySize.Size.large]: { neededCommits: 8, impact: 4 },
    },
    totalTicks: 10000,
    sprint: {
        interval: 300,
        grooming: 50,
        start: 300,
    },
    performanceReview: {
        interval: 10,
    },
    itemGenerator: { start: 0, interval: 40 },
}

export default config
