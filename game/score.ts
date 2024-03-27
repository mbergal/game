import { EngineeringLevels } from "./levels"

export type Score = {
    money: number
    level: number
    impact: number
    stockPrice: number
}

export function make(): Score {
    return {
        money: 0,
        level: 0,
        impact: 0,
        stockPrice: 0,
    }
}
