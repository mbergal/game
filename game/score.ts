import { EngineeringLevel } from "./levels"

export type Score = {
    codeBlocks: number
    money: number
    level: number
    impact: number
}

export function make(): Score {
    return {
        codeBlocks: 0,
        money: 0,
        level: 0,
        impact: 0,
    }
}
