import { Coffee } from "../objects/coffee"
import { Commit } from "../objects/commit"
import { Door } from "../objects/door"
import * as random from "../utils/random"
import { assertUnreachable } from "../utils/utils"
import * as Game from "./game"
import config from "./config"

type Waiting = { type: "waiting"; tact: number }
type Generating = { type: "generating"; tact: number }

export type t = { state: Waiting | Generating }

export interface ItemGenerator extends t {}

export function make(): t {
    return { state: { type: "waiting", tact: 0 } }
}

export function tick(itemGenerator: t, game: Game.Game) {
    switch (itemGenerator.state.type) {
        case "waiting":
            if (itemGenerator.state.tact > config.itemGenerator.start)
                itemGenerator.state = { type: "generating", tact: 0 }
            else {
                itemGenerator.state.tact += 1
            }
        case "generating":
            if (itemGenerator.state.tact > config.itemGenerator.interval) {
                itemGenerator.state.tact = 0
                const item_type = random.choice(
                    ["door" as const, "commit" as const, "coffee" as const],
                    [1, 90, 10]
                )
                let item
                switch (item_type) {
                    case "door":
                        item = Door.make(game.map.getRandomEmptyLocation())
                        game.map.add([item])
                        break
                    case "commit":
                        item = Commit.make(game.map.getRandomEmptyLocation())
                        game.map.add([item])
                        break
                    case "coffee":
                        item = Coffee.make(game.map.getRandomEmptyLocation())
                        game.map.add([item])
                        break
                    default:
                        assertUnreachable(item_type)
                }
            } else {
                itemGenerator.state.tact += 1
            }
    }
}
