import _ from "lodash"
import * as GameObjects from "../objects/objects"
import * as Story from "../objects/story"
import { assertUnreachable } from "../utils/utils"
import config from "./config"
import { Effect, showMessage } from "./effects"
import * as Game from "./game"
import * as GameMap from "./map"
import * as random from "../utils/random"
import * as StorySize from "../objects/story_size"

type SprintStart = {
    type: "sprintStart"
}

type SprintEnd = {
    type: "sprintEnd"
}

type GroomBacklogStart = {
    type: "groomBacklogStart"
}

type CreateBacklogIssue = { type: "createBacklogIssue"; size: StorySize.Size }

type GroomBacklogEnd = {
    type: "groomBacklogEnd"
}

type SprintDayStart = {
    type: "sprintDayStart"
    day: number
}

type SprintDayEnd = {
    type: "sprintDayEnd"
    day: number
}

type WeekendStart = {
    type: "weekendStart"
}
type WeekendEnd = {
    type: "weekendEnd"
}

type Event =
    | SprintStart
    | SprintEnd
    | WeekendEnd
    | WeekendStart
    | GroomBacklogStart
    | GroomBacklogEnd
    | SprintDayStart
    | SprintDayEnd
    | CreateBacklogIssue

type Plan = Record<number, Event[]>

export interface t {
    plan: Plan
    day: number
}

export interface Sprint extends t {}

export function make(startTick: number): t {
    return {
        day: 0,
        plan: generatePlan(startTick),
    }
}

export function generatePlan(startTick: number): Record<number, Event[]> {
    const DAY = config.dayTicks
    const plan: Record<number, Event[]> = {}

    const addEvent = (event: Event) => {
        if (plan[startTick] == null) plan[startTick] = []
        plan[startTick].push(event)
    }

    addEvent({ type: "sprintStart" })
    addEvent({ type: "groomBacklogStart" })

    const storySizes = [
        StorySize.Size.small,
        StorySize.Size.small,
        StorySize.Size.small,
        StorySize.Size.medium,
        StorySize.Size.medium,
        StorySize.Size.large,
    ]

    const times = storySizes.map((x, i) => [x, Math.round((DAY / storySizes.length) * i)])

    const groomingStart = startTick
    for (const t of times) {
        startTick = groomingStart + t[1]
        addEvent({ type: "createBacklogIssue", size: t[0] })
    }

    startTick += DAY - 1
    addEvent({ type: "groomBacklogEnd" })
    startTick = DAY

    let sprintDay = 0
    for (const i of _.range(4)) {
        sprintDay += 1
        addEvent({ type: "sprintDayStart", day: sprintDay })
        startTick += DAY - 1
        addEvent({ type: "sprintDayEnd", day: sprintDay })
        startTick += 1
    }
    addEvent({ type: "sprintEnd" })

    addEvent({ type: "weekendStart" })
    startTick += 2 * DAY + 1
    addEvent({ type: "weekendEnd" })

    for (const i of _.range(4)) {
        sprintDay += 1
        addEvent({ type: "sprintDayStart", day: sprintDay })
        startTick += DAY - 1
        addEvent({ type: "sprintDayEnd", day: sprintDay })
        startTick += 1
    }
    addEvent({ type: "sprintEnd" })

    addEvent({ type: "weekendStart" })
    startTick += 2 * DAY + 1
    addEvent({ type: "weekendEnd" })

    return plan
}

export function* tick(sprint: t, game: { map: GameMap.GameMap; ticks: number }): Generator<Effect> {
    const events = sprint.plan[game.ticks]
    if (events) {
        for (const event of events) {
            switch (event.type) {
                case "createBacklogIssue":
                    const small = Story.make(game.map.getRandomEmptyLocation(), event.size)
                    game.map.add(small)

                    yield showMessage(
                        `Added ${StorySize.toString(event.size)} story to "To Do"`,
                        10
                    )
                    break
                case "groomBacklogEnd":
                    break
                case "groomBacklogStart":
                    yield showMessage("Grooming backlog ...", 40)
                    break
                case "sprintDayEnd":
                case "sprintDayStart":
                    yield showMessage(`Sprint day ${event.day}`, 20)
                    break
                case "sprintEnd":
                    yield showMessage("Sprint ended", 49)
                    const stories = GameObjects.filter(game.map.objects, "story")
                    game.map.remove(stories)
                    break
                case "sprintStart":
                case "weekendEnd":
                case "weekendStart":
                    break
                default:
                    assertUnreachable(event)
            }
        }
    }
}
