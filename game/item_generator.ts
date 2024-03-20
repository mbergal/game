import * as Coffee from "../objects/coffee"
import * as Commit from "../objects/commit"
import * as Door from "../objects/door"
import * as random from "../utils/random"
import { assertUnreachable } from "../utils/utils"
import * as Game from "./game"

export function generateAnItem(game: Game.Game) {
    if (game.itemGenerator.tact > 100) {
        game.itemGenerator.tact = 0
        const aa = random.choice(
            ["door" as const, "commit" as const, "coffee" as const],
            [1, 100, 0]
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
        game.itemGenerator.tact += 1
        return null
    }
}
