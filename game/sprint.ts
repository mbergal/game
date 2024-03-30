import _ from "lodash"
import { GameObjects } from "../objects"
import * as Player from "../objects/player"
import * as Story from "../objects/story"
import * as StorySize from "../objects/story_size"
import { assertUnreachable } from "../utils/utils"
import config from "./config"
import * as Effect from "./effect"
import { Event } from "./event"
import * as GameTime from "./game_time"
import * as GameMap from "./map"
import * as Plan from "./plan"

export interface t {
    day: number
    daysLeft: number
}

export interface Sprint extends t {}

export function make(): t {
    return {
        day: 0,
        daysLeft: 0,
    }
}

export function generatePlan(startTick: number): [Plan.Plan, number] {
    const DAY = config.dayTicks
    const SPRINT_DAYS = 10
    const plan = Plan.make()

    const addEvent = (event: Event.t) => {
        Plan.addEvent(plan, startTick, event)
    }

    addEvent({ type: "sprintStart" })
    addEvent({ type: "groomBacklogStart" })

    const storySizes: StorySize.Size[] = [
        "small",
        "small",
        "small",
        "medium",
        "medium",
        "large",
    ] as const

    const times = storySizes.map((x, i) => [x, Math.round((DAY / storySizes.length) * i)] as const)

    let sprintDay = 1
    addEvent({
        type: "sprintDayStart",
        sprintDay: sprintDay,
        sprintDaysLeft: SPRINT_DAYS - sprintDay,
        ...GameTime.make(startTick),
    })

    const groomingStart = startTick
    for (const t of times) {
        startTick = groomingStart + t[1]
        addEvent({ type: "createBacklogIssue", size: t[0] })
    }

    startTick += DAY - 1
    addEvent({ type: "groomBacklogEnd" })
    addEvent({
        type: "sprintDayEnd",
        sprintDay: sprintDay,
        sprintDaysLeft: SPRINT_DAYS - sprintDay,
        ...GameTime.make(startTick),
    })
    startTick += 1

    for (const i of _.range(4)) {
        const day = Math.floor(startTick / DAY)
        sprintDay += 1
        addEvent({
            type: "sprintDayStart",
            sprintDay: sprintDay,
            sprintDaysLeft: SPRINT_DAYS - sprintDay,
            ...GameTime.make(startTick),
        })
        startTick += DAY - 1
        addEvent({
            type: "sprintDayEnd",
            sprintDay: sprintDay,
            sprintDaysLeft: SPRINT_DAYS - sprintDay,
            ...GameTime.make(startTick),
        })
        startTick += 1
    }
    addEvent({ type: "weekendStart" })
    startTick += 2 * DAY + 1
    addEvent({ type: "weekendEnd" })

    for (const i of _.range(4)) {
        sprintDay += 1
        addEvent({
            type: "sprintDayStart",
            sprintDay: sprintDay,
            sprintDaysLeft: SPRINT_DAYS - sprintDay,
            ...GameTime.make(startTick),
        })
        startTick += DAY - 1
        addEvent({
            type: "sprintDayEnd",
            sprintDay: sprintDay,
            sprintDaysLeft: SPRINT_DAYS - sprintDay,
            ...GameTime.make(startTick),
        })
        startTick += 1
    }
    addEvent({ type: "sprintEnd" })

    addEvent({ type: "weekendStart" })
    startTick += 2 * DAY + 1
    addEvent({ type: "weekendEnd" })

    return [plan, startTick] as const
}

export function* tick(
    sprint: t,
    game: { map: GameMap.GameMap; time: { ticks: number }; plan: Plan.Plan; player: Player.Player },
): Generator<Effect.Effect> {
    const events = game.plan.get(game.time.ticks)
    if (events) {
        for (const event of events) {
            switch (event.type) {
                case "createBacklogIssue":
                    const story = Story.make(game.map.getRandomEmptyLocation(), event.size)
                    game.map.add(story)
                    yield Effect.showMessage(`Moved "${story.name}" to To Do`, 500)
                    break
                case "groomBacklogEnd":
                case "collapseStart":
                    break
                case "groomBacklogStart":
                    yield Effect.showMessage("Grooming backlog ...", 2000)
                    break
                case "sprintDayEnd":
                    break
                case "sprintDayStart":
                    sprint.day = event.sprintDay
                    sprint.daysLeft = event.sprintDaysLeft
                    yield Effect.showMessage(
                        `Sprint day ${event.sprintDay} ${event.dayOfWeek}`,
                        3_000,
                    )
                    break
                case "sprintEnd":
                    yield Effect.showMessage("Sprint ended", 3000)
                    const stories = GameObjects.filter(game.map.objects, "story")
                    game.map.remove(stories)
                    if (game.player.task != null) {
                        yield Effect.showMessage(`Abandoned ${game.player.task}`, 2000)
                        game.player.task = null
                    }
                    break
                case "sprintStart":
                    break
                case "weekendStart":
                    yield Effect.showMessage("Weekend, finally!!!", 3_000)
                    break
                case "weekendEnd":
                    yield Effect.showMessage("End of Weekend :(", 3_000)
                    break
                case "gameEnded":
                case "gameStarted":
                    break
                case "dayStarted":
                    break
                case "performanceReview":
                    break
                default:
                    assertUnreachable(event)
            }
        }
    }
}
