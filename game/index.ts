import { Command } from "../commands"
import { ItemGenerator } from "../objects/item"
import { GameMap } from "./map"
import * as Score from "./score"
export * as Score from "./score"

export type Game = {
    map: GameMap
    score: Score.Score
    itemGenerator: ItemGenerator
    commands: Command[]
}
