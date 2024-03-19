import { EngineeringLevel } from "./levels"

export type Score = {
    ticks: number
    codeBlocks: number
    money: number
    level: number
}

export function make(): Score {
    return {
        ticks: 0,
        codeBlocks: 0,
        money: 0,
        level: 0,
    }
}
