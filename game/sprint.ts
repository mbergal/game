import _ from "lodash"
import { Plan } from "../game/plan"
import * as GameObjects from "../objects/objects"
import * as Player from "../objects/player"
import * as Story from "../objects/story"
import * as StorySize from "../objects/story_size"
import { assertUnreachable } from "../utils/utils"
import config from "./config"
import { Effect, showMessage } from "./effect"
import * as Event from "./event"
import * as GameMap from "./map"
import { GameTime } from "./game_time"

export interface t {
    day: number
}

export interface Sprint extends t {}

export function make(): t {
    return {
        day: 0,
    }
}

export function generateSprint(startTick: number): [Plan.t, number] {
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
        const day = Math.floor(startTick / DAY)
        sprintDay += 1
        addEvent({ type: "sprintDayStart", sprintDay: sprintDay, ...GameTime.make(startTick) })
        startTick += DAY - 1
        addEvent({ type: "sprintDayEnd", sprintDay: sprintDay, ...GameTime.make(startTick) })
        startTick += 1
    }
    addEvent({ type: "weekendStart" })
    startTick += 2 * DAY + 1
    addEvent({ type: "weekendEnd" })

    for (const i of _.range(4)) {
        sprintDay += 1
        addEvent({ type: "sprintDayStart", sprintDay: sprintDay, ...GameTime.make(startTick) })
        startTick += DAY - 1
        addEvent({ type: "sprintDayEnd", sprintDay: sprintDay, ...GameTime.make(startTick) })
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
    game: { map: GameMap.GameMap; time: { ticks: number }; plan: Plan.t; player: Player.Player }
): Generator<Effect> {
    const events = game.plan.get(game.time.ticks)
    if (events) {
        for (const event of events) {
            switch (event.type) {
                case "createBacklogIssue":
                    const story = Story.make(game.map.getRandomEmptyLocation(), event.size)
                    game.map.add(story)
                    yield showMessage(`Moved "${story.name}" to To Do`, 2000)
                    break
                case "groomBacklogEnd":
                case "collapseStart":
                    break
                case "groomBacklogStart":
                    yield showMessage("Grooming backlog ...", 2000)
                    break
                case "sprintDayEnd":
                    break
                case "sprintDayStart":
                    yield showMessage(`Sprint day ${event.sprintDay} ${event.dayOfWeek}`, 3000)
                    break
                case "sprintEnd":
                    yield showMessage("Sprint ended", 3000)
                    const stories = GameObjects.filter(game.map.objects, "story")
                    game.map.remove(stories)
                    if (game.player.task != null) {
                        yield showMessage(`Abandoned ${game.player.task}`, 2000)
                        game.player.task = null
                    }
                    break
                case "sprintStart":
                    break
                case "weekendStart":
                    yield showMessage("Weekend, finally!!!", 30)
                    break
                case "weekendEnd":
                    yield showMessage("End of Weekend :(", 30)
                    break
                case "gameEnded":
                case "gameStarted":
                    break
                case "dayStarted":
                    break
                default:
                    assertUnreachable(event)
            }
        }
    }
}
