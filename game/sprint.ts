import * as GameObjects from "../objects/objects"
import * as Story from "../objects/story"
import { assertUnreachable } from "../utils/utils"
import config from "./config"
import { Effect, showMessage } from "./effects"
import * as Game from "./game"
import * as GameMap from "./map"

type _State = { enter: boolean }

type Sprinting = {
    type: "sprinting"
    tact: number
} & _State

type Grooming = {
    type: "grooming"
    tact: number
} & _State

type State = Sprinting | Grooming

export interface t {
    state: State
    day: number
}

export interface Sprint extends t {}

export function make(): t {
    return {
        day: 0,
        state: {
            type: "grooming",
            tact: 0,
            enter: true,
        },
    }
}

export function* tick(sprint: t, game: { map: GameMap.GameMap; ticks: number }): Generator<Effect> {
    const go = (state: State["type"]) => (sprint.state = { type: state, tact: 0, enter: true })
    sprint.state.tact += 1
    const day = Math.floor(game.ticks / config.dayTicks) % config.sprint.schedule.length
    const sprintDay = Math.floor(game.ticks / config.dayTicks)
    const dayType = config.sprint.schedule[day % config.sprint.schedule.length]
    const isNewDay = sprint.day != day

    start: while (true)
        try {
            switch (sprint.state.type) {
                case "grooming": {
                    if (sprint.state.enter) {
                        debugger
                        for (const effect of startSprint(game.map)) yield effect
                    }
                    switch (dayType) {
                        case "grooming":
                            break
                        case "weekend":
                        case "working":
                            go("sprinting")
                            continue start
                        default:
                            assertUnreachable(dayType)
                    }
                    sprint.state.enter = false
                    break
                }
                case "sprinting":
                    switch (dayType) {
                        case "grooming":
                            for (const effect of endSprint(game.map)) yield effect
                            debugger

                            go("grooming")
                            break
                        case "weekend":
                            if (isNewDay) {
                                yield showMessage(`Weekend! Let's get some rest!`, 50)
                            }
                            sprint.state.enter = false
                            break
                        case "working":
                            if (isNewDay) {
                                yield showMessage(`Sprint day ${day} :(`, 50)
                            }
                            sprint.state.enter = false
                            break
                        default:
                            assertUnreachable(dayType)
                    }

                    break
                default:
                    assertUnreachable(sprint.state)
            }
            return
        } finally {
            sprint.day = day
        }
}

function* startSprint(map: GameMap.GameMap): Generator<Effect> {
    const small = Story.make(map.getRandomEmptyLocation(), Story.Size.small)
    map.add(small)
    const medium = Story.make(map.getRandomEmptyLocation(), Story.Size.medium)
    map.add(medium)
    const large = Story.make(map.getRandomEmptyLocation(), Story.Size.large)
    map.add(large)

    yield showMessage("Grooming backlog ...", 40)
}

function* endSprint(map: GameMap.GameMap): Generator<Effect> {
    yield showMessage("Sprint ended", 20)

    const stories = GameObjects.filter(map.objects, "story")
    map.remove(stories)
}
