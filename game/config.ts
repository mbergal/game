import * as StorySize from "../objects/story_size"

export type Config = {
    boss: {
        TACTS_FOR_SINGLE_MOVE: number
        TACTS_FOR_JUMP: number
    }
    totalDays: number
    dayTicks: number
    tickInterval: number
    story: Record<StorySize.Size, { neededCommits: number; impact: number }>
    performanceReview: {
        interval: number
    }
    sprint: {
        startDay: number
    }
    itemGenerator: { start: number; interval: number }
    items: {
        coffee: {
            speedUpDays: number
        }
    }
}

const config: Config = {
    tickInterval: 100,
    boss: {
        TACTS_FOR_JUMP: 3,
        TACTS_FOR_SINGLE_MOVE: 4 * 3,
    },
    totalDays: 14 * 10,
    dayTicks: 40,
    story: {
        small: { neededCommits: 2, impact: 1 },
        medium: { neededCommits: 5, impact: 2 },
        large: { neededCommits: 8, impact: 4 },
    },
    sprint: {
        startDay: 0,
    },
    performanceReview: {
        interval: 28,
    },
    itemGenerator: { start: 0, interval: 40 },
    items: {
        coffee: {
            speedUpDays: 1,
        },
    },
}

export default config
