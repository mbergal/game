export type Score = {
    ticks: number
    codeBlocks: number
}

export function make(): Score {
    return {
        ticks: 0,
        codeBlocks: 0,
    }
}
