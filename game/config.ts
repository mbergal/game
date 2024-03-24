import * as StorySize from "../objects/story_size"

export type Config = {
    boss: {
        TACTS_FOR_SINGLE_MOVE: number
        TACTS_FOR_JUMP: number
    }
    totalDays: number
    dayTicks: number
    story: Record<StorySize.Size, { neededCommits: number; impact: number }>
    totalTicks: number
    performanceReview: {
        interval: number
    }
    sprint: {
        startDay: number
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
    totalDays: 14 * 10,
    dayTicks: 100,
    story: {
        small: { neededCommits: 2, impact: 1 },
        medium: { neededCommits: 5, impact: 2 },
        large: { neededCommits: 8, impact: 4 },
    },
    totalTicks: 10000,
    sprint: {
        startDay: 0,
    },
    performanceReview: {
        interval: 10,
    },
    itemGenerator: { start: 0, interval: 40 },
}

export default config