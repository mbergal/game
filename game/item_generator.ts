import * as Coffee from "../objects/coffee"
import * as Commit from "../objects/commit"
import * as Door from "../objects/door"
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
                const aa = random.choice(
                    ["door" as const, "commit" as const, "coffee" as const],
                    [300, 1, 10]
                )
                let item
                switch (aa) {
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
                        assertUnreachable(aa)
                }
            } else {
                itemGenerator.state.tact += 1
            }
    }
}
