import { Command } from "../commands"
import { ItemGenerator } from "../objects/item"
import * as GameMap from "./map"
export * as GameMap from "./map"
import * as Score from "./score"
export * as Score from "./score"

export type Game = {
    map: GameMap.GameMap
    score: Score.Score
    itemGenerator: ItemGenerator
    commands: Command[]
}
