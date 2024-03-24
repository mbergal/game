import _ from "lodash"
import * as GameObjects from "../objects/objects"
import * as Story from "../objects/story"
import { assertUnreachable } from "../utils/utils"
import config from "./config"
import { Effect, showMessage } from "./effect"
import * as Game from "./game"
import * as Event from "./event"
import * as GameMap from "./map"
import * as random from "../utils/random"
import * as StorySize from "../objects/story_size"
import * as Plan from "../game/plan"

export interface t {
    plan: Plan.t
    day: number
}

export interface Sprint extends t {}

export function make(startTick: number): t {
    return {
        day: 0,
        plan: generatePlan(startTick),
    }
}

export function generatePlan(startDay: number): Plan.t {
    let plan = Plan.make()
    let startTick = startDay * config.dayTicks
    for (const i in _.range(Math.floor((config.totalDays - startDay) / 14))) {
        const r = generateSprint(startTick)
        Plan.append(plan, r[0])
        startTick += r[1]
    }
    return plan
}

function generateSprint(startTick: number): [Plan.t, number] {
    const DAY = config.dayTicks
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

    const groomingStart = startTick
    for (const t of times) {
        startTick = groomingStart + t[1]
        addEvent({ type: "createBacklogIssue", size: t[0] })
    }

    startTick += DAY - 1
    addEvent({ type: "groomBacklogEnd" })
    startTick += 1

    let sprintDay = 0
    for (const i of _.range(4)) {
        sprintDay += 1
        addEvent({ type: "sprintDayStart", day: sprintDay })
        startTick += DAY - 1
        addEvent({ type: "sprintDayEnd", day: sprintDay })
        startTick += 1
    }
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

    return [plan, startTick] as const
}

export function* tick(sprint: t, game: { map: GameMap.GameMap; ticks: number }): Generator<Effect> {
    const events = sprint.plan.get(game.ticks)
    if (events) {
        for (const event of events) {
            switch (event.type) {
                case "createBacklogIssue":
                    const story = Story.make(game.map.getRandomEmptyLocation(), event.size)
                    game.map.add(story)

                    yield showMessage(`Added ${story.name}`, 20)
                    break
                case "groomBacklogEnd":
                    break
                case "groomBacklogStart":
                    yield showMessage("Grooming backlog ...", 40)
                    break
                case "sprintDayEnd":
                    break
                case "sprintDayStart":
                    yield showMessage(`Sprint day ${event.day}`, 20)
                    break
                case "sprintEnd":
                    yield showMessage("Sprint ended", 49)
                    const stories = GameObjects.filter(game.map.objects, "story")
                    game.map.remove(stories)
                    break
                case "sprintStart":
                    break
                case "weekendStart":
                    yield showMessage("Weekend, finally!!!", 30)
                    break
                case "weekendEnd":
                    yield showMessage("End of Weekend :(", 30)
                    break
                default:
                    assertUnreachable(event)
            }
        }
    }
}
