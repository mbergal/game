import { Coffee, Commit, Door, Item } from "@/objects"
import * as random from "@/utils/random"
import { assertUnreachable } from "@/utils/utils"
import config from "./config"
import * as Game from "./game"

type Waiting = { type: "waiting"; tact: number }
type Generating = { type: "generating"; tact: number }

export type ItemGenerator = { state: Waiting | Generating }

export function make(): ItemGenerator {
    return { state: { type: "waiting", tact: 0 } }
}

export function tick(itemGenerator: ItemGenerator, game: Game.Game) {
    switch (itemGenerator.state.type) {
        case "waiting":
            if (itemGenerator.state.tact > config.itemGenerator.start)
                itemGenerator.state = { type: "generating", tact: 0 }
            else {
                itemGenerator.state.tact += 1
            }
        case "generating":
            if (
                itemGenerator.state.tact > config.itemGenerator.interval &&
                game.map.objects.filter(Item.isItem).length < config.itemGenerator.maxItems
            ) {
                itemGenerator.state.tact = 0
                const itemType = random.choice(
                    ["door" as const, "commit" as const, "coffee" as const],
                    [
                        config.itemGenerator.frequencies.door,
                        config.itemGenerator.frequencies.commit,
                        config.itemGenerator.frequencies.coffee,
                    ]
                )
                let item
                switch (itemType) {
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
                        assertUnreachable(itemType)
                }
            } else {
                itemGenerator.state.tact += 1
            }
    }
}
