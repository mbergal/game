import * as GameObjects from "../objects/objects"
import * as Story from "../objects/story"
import config from "./config"
import * as Game from "./game"
import * as GameMap from "./map"
type GroomingBacklog = {
    type: "grooming"
    tact: number
}

type InProcess = {
    type: "inprocess"
    tact: number
}

type State = GroomingBacklog | InProcess

export interface t {
    state: State
}

export interface Sprint extends t {}

export function make(): t {
    return {
        state: {
            type: "grooming",
            tact: 0,
        },
    }
}

export function tick(sprint: t, game: Game.t) {
    switch (sprint.state.type) {
        case "grooming":
            sprint.state.tact += 1
            if (sprint.state.tact > config.sprint.grooming) {
                startSprint(game)
                sprint.state = { type: "inprocess", tact: 0 }
            }
        case "inprocess":
            sprint.state.tact += 1
            if (sprint.state.tact > config.sprint.interval) {
                endSprint(game.map)
                sprint.state = { type: "grooming", tact: 0 }
            }
    }
}

function startSprint(game: Game.t) {
    const small = Story.make(game.map.getRandomEmptyLocation(), Story.Size.small)
    game.map.add(small)
    const medium = Story.make(game.map.getRandomEmptyLocation(), Story.Size.medium)
    game.map.add(medium)
    const large = Story.make(game.map.getRandomEmptyLocation(), Story.Size.large)
    game.map.add(large)

    Game.message(game, { text: "Sprint started!!!", ttl: 40 })
}

function endSprint(map: GameMap.GameMap) {
    const stories = GameObjects.filter(map.objects, "story")
    map.remove(stories)
}
