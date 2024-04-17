import { Event, GameMap } from "@/game"
import { GameObjects, Player, Story } from "@/objects"
import _ from "lodash"
import { Vector } from "@/geometry"
import * as generator from "@/generator"
import * as StorySize from "../objects/story_size"
import { assertUnreachable } from "../utils/utils"
import { assert } from "@/utils/assert"
import config from "./config"
import * as Effect from "./effect"
import * as Effects from "./effects"
import * as GameTime from "./game_time"
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

export function generatePlan(startTick: number): readonly [Plan.Plan, number] {
    const DAY = config.dayTicks
    const SPRINT_DAYS = 10
    const plan = Plan.make()

    const addEvent = (event: Event.t) => {
        Plan.addEvent(plan, startTick, event)
    }

    addEvent({ type: "sprintStart" })
    addEvent({ type: "groomBacklogStart" })

    const storySizes: StorySize.Size[] = [
        "small" as const,
        "small" as const,
        "small" as const,
        "medium" as const,
        "medium" as const,
        "large" as const,
    ]

    const times = storySizes.map((x, i) => [x, Math.round((DAY / storySizes.length) * i)] as const)

    addEvent({ type: "workWeekStarted", ...GameTime.make(startTick) })

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
    addEvent({ type: "workWeekEnded", ...GameTime.make(startTick) })
    addEvent({ type: "weekendStart" })
    startTick += 2 * DAY + 1
    addEvent({ type: "weekendEnd" })
    addEvent({ type: "workWeekStarted", ...GameTime.make(startTick) })

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
    addEvent({ type: "workWeekEnded", ...GameTime.make(startTick) })
    addEvent({ type: "weekendStart" })
    startTick += 2 * DAY + 1
    addEvent({ type: "weekendEnd" })

    return [plan, startTick] as const
}

function distance(pos1: Vector.t, pos2: Vector.t): number {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y)
}

function notCloseToOtherStories(
    objects: GameObjects.t,
    pos: Vector.t,
    minDistance: number,
): boolean {
    const stories = GameObjects.filter(objects, "story")
    for (const story of stories) {
        const d_ = distance(pos, story.position)
        if (d_ < minDistance) {
            return false
        }
    }
    return true
}

function notOnHorizontalWallRow(pos: Vector.t): boolean {
    return pos.y % 2 == 1
}

export function tick(
    sprint: t,
    game: { map: GameMap.GameMap; time: { ticks: number }; plan: Plan.Plan; player: Player.Player },
): Effects.Effects {
    const effects: Effects.Effects = []
    const events = game.plan.get(game.time.ticks)
    if (events) {
        for (const event of events) {
            switch (event.type) {
                case "createBacklogIssue":
                    const storyPosition = generator.ensure(
                        () => game.map.getRandomEmptyLocation(),
                        (x) =>
                            notCloseToOtherStories(game.map.objects, x, 10) &&
                            notOnHorizontalWallRow(x),
                    )
                    const story = Story.make(storyPosition, event.size)

                    game.map.add(story)
                    Effects.append(
                        effects,
                        Effect.showMessage(`Moved "${story.name}" to To Do`, 500),
                    )
                    break
                case "groomBacklogEnd":
                case "collapseStart":
                    break
                case "groomBacklogStart":
                    Effects.append(effects, Effect.showMessage("Grooming backlog ...", 2000))
                    break
                case "sprintDayEnd":
                    break
                case "sprintDayStart":
                    sprint.day = event.sprintDay
                    sprint.daysLeft = event.sprintDaysLeft
                    Effects.append(
                        effects,
                        Effect.showMessage(
                            `Sprint day ${event.sprintDay} ${event.dayOfWeek}`,
                            3_000,
                        ),
                    )
                    break
                case "sprintEnd":
                    Effects.append(effects, Effect.showMessage("Sprint ended", 3000))
                    const stories = GameObjects.filter(game.map.objects, "story")
                    game.map.remove(stories)
                    if (game.player.task != null) {
                        Effects.append(
                            effects,
                            Effect.showMessage(`Abandoned ${game.player.task}`, 2000),
                        )
                        game.player.task = null
                    }
                    break
                case "sprintStart":
                    break
                case "workWeekStarted":
                case "workWeekEnded":
                    break
                case "weekendStart":
                    Effects.append(effects, Effect.showMessage("Weekend, finally!!!", 3_000))
                    break
                case "weekendEnd":
                    Effects.append(effects, Effect.showMessage("End of Weekend :(", 3_000))
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
    return effects
}
