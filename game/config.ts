import * as StorySize from "../objects/story_size"

export type Config = {
    maze: {
        // tuple first element is the room length, second is min number of doors,
        // third is max number of doors
        numberOfDoorsPerRoom: [number, number, number][]
    }
    boss: {
        TACTS_FOR_SINGLE_MOVE: number
        TACTS_FOR_JUMP: number
        footprint: {
            zIndex: number
            visible: boolean
        }
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
        footprint: {
            zIndex: number
            visible: boolean
        }
        pathlights: {
            zIndex: number
            visible: boolean
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
            prReview: number
        }
    }
    items: {
        coffee: {
            zIndex: number
            speedUpDays: number
            visible: boolean
        }
        door: {
            zIndex: number
        }
        prReview: {
            zIndex: number
            visible: boolean
        }
    }
}

const config: Config = {
    maze: {
        numberOfDoorsPerRoom: [
            [3, 0, 1],
            [6, 1, 2],
            [100, 2, 5],
        ],
    },
    tickInterval: 100,
    boss: {
        TACTS_FOR_JUMP: 3,
        TACTS_FOR_SINGLE_MOVE: 4 * 3,
        footprint: {
            zIndex: 2,
            visible: false,
        },
    },
    developer: {
        moves: {
            weights: {
                reverseDirection: 1,
                forwardDirection: 10,
                footprints: [1000, 400, 20],
                freeSpace: 10000,
            },
            ticksPerMove: 3,
        },
        footprint: {
            zIndex: 2,
            visible: false,
        },
        pathlights: {
            zIndex: 2,
            visible: false,
        },
    },
    totalDays: 14 * 3,
    // totalDays: 2,
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
            door: 2,
            commit: 10,
            coffee: 1,
            prReview: 2,
        },
    },
    items: {
        coffee: {
            zIndex: 2,
            speedUpDays: 1,
            visible: true,
        },
        door: {
            zIndex: 2,
        },
        prReview: {
            zIndex: 2,
            visible: true,
        },
    },
}

export default config
