import _ from "lodash"
import * as Story from "../objects/story"
import * as GameMap from "./map"

export function generateSprint(map: GameMap.GameMap) {
    const small = Story.make(map.getRandomEmptyLocation(), Story.Size.small)
    map.add(small)
    const medium = Story.make(map.getRandomEmptyLocation(), Story.Size.medium)
    map.add(medium)
    const large = Story.make(map.getRandomEmptyLocation(), Story.Size.large)
    map.add(large)
}
