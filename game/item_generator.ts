import * as Game from "./game"
import * as Door from "../objects/door"
import * as Commit from "../objects/commit"
import * as Story from "../objects/story"
import * as random from "../utils/random"

export function generateAnItem(game: Game.Game) {
    if (game.itemGenerator.tact > 100) {
        game.itemGenerator.tact = 0
        const aa = random.choice(["door" as const, "commit" as const], [1, 9])
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
        }
    } else {
        game.itemGenerator.tact += 1
        return null
    }
}
