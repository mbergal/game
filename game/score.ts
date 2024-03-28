export type Score = {
    money: number
    impact: number
    stockPrice: number
}

export function make(): Score {
    return {
        money: 0,
        impact: 0,
        stockPrice: 0,
    }
}
