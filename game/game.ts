import { Command } from "../commands"
import { ItemGenerator } from "../objects/item"
import * as Player from "../objects/player"
import * as GameMap from "./map"
export * as GameMap from "./map"
import * as Score from "./score"
export * as Score from "./score"

export type t = {
    map: GameMap.GameMap
    score: Score.Score
    itemGenerator: ItemGenerator
    commands: Command[]
    messages: string[]
    player?: Player.Player
}

export type Game = t
