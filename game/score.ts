import { Item } from "@/objects"

export type Score = {
    money: number
    impact: number
    stockPrice: number
    generatedItems: Item.Item[]
}

export function make(): Score {
    return {
        money: 0,
        impact: 0,
        stockPrice: 0,
        generatedItems: [],
    }
}
