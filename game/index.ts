import { GameMap } from "./map"

export type Score = {
    ticks: number
}
export type Game = {
    map: GameMap
    score: Score
}
