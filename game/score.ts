import { EngineeringLevel } from "./levels"

export type Score = {
    codeBlocks: number
    money: number
    level: number
    impact: number
    stockPrice: number
}

export function make(): Score {
    return {
        codeBlocks: 0,
        money: 0,
        level: 0,
        impact: 0,
        stockPrice: 0,
    }
}
