import { Item } from "@/objects"
import * as Message from "./message"

export type NullEffect = {
    type: "null"
}

export type AddImpact = {
    type: "addImpact"
    impact: number
}

export type ItemGenerated = {
    type: "itemGenerated"
    item: Item.Item
}

export function addImpact(impact: number): AddImpact {
    return {
        type: "addImpact",
        impact: impact,
    }
}

export function itemGenerated(item: Item.Item): ItemGenerated {
    return {
        type: "itemGenerated",
        item: item,
    }
}

export type ShowMessage = {
    type: "showMessage"
    message: Message.Message
}

export function showMessage(text: string, ttl: number): ShowMessage {
    return { type: "showMessage", message: { text, ttl } }
}

export type Effect = NullEffect | ShowMessage | AddImpact | ItemGenerated
