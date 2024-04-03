import * as StorySize from "../objects/story_size"

export type Config = {
    boss: {
        TACTS_FOR_SINGLE_MOVE: number
        TACTS_FOR_JUMP: number
    }
    developer: {
        moves: {
            weights: {
                footprints: [number, number, number]
                reverseDirection: number
                forwardDirection: number
                freeSpace: number
            }
            ticksPerMove: number
        }
    }
    totalDays: number
    dayTicks: number
    tickInterval: number
    story: Record<StorySize.Size, { neededCommits: number; impact: number }>
    performanceReview: {
        interval: number
    }
    messages: {
        showNextMessageAfter: number
    }
    sprint: {
        startDay: number
    }
    itemGenerator: {
        start: number
        interval: number
        maxItems: number
        frequencies: {
            door: number
            commit: number
            coffee: number
        }
    }
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
    developer: {
        moves: {
            weights: {
                reverseDirection: 1,
                forwardDirection: 10,
                footprints: [1000, 400, 20],
                freeSpace: 10000,
            },
            ticksPerMove: 2,
        },
    },
    totalDays: 14 * 3,
    dayTicks: 80,
    story: {
        small: { neededCommits: 2, impact: 1 },
        medium: { neededCommits: 5, impact: 2 },
        large: { neededCommits: 8, impact: 4 },
    },
    sprint: {
        startDay: 0,
    },
    messages: { showNextMessageAfter: 500 },
    performanceReview: {
        interval: 28,
    },
    itemGenerator: {
        start: 0,
        interval: 40,
        maxItems: 20,
        frequencies: {
            door: 1,
            commit: 10,
            coffee: 1,
        },
    },
    items: {
        coffee: {
            speedUpDays: 1,
        },
    },
}

export default config
