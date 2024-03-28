import * as Message from "./message"

export type NullEffect = {
    type: "null"
}

export type AddImpact = {
    type: "addImpact"
    impact: number
}

export function addImpact(impact: number): AddImpact {
    return {
        type: "addImpact",
        impact: impact,
    }
}

export type ShowMessage = {
    type: "showMessage"
    message: Message.Message
}

export function showMessage(text: string, ttl: number): ShowMessage {
    return { type: "showMessage", message: { text, ttl } }
}

export type Effect = NullEffect | ShowMessage | AddImpact
