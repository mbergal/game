import { Command } from "../commands"
import { ItemGenerator } from "../objects/item"
import { GameMap } from "./map"

export type Score = {
    ticks: number
}
export type Game = {
    map: GameMap
    score: Score
    itemGenerator: ItemGenerator
    commands: Command[]
}
