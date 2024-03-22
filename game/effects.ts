import * as Message from "./message"

export type NullEffect = {
    type: "null"
}
export type ShowMessage = {
    type: "showMessage"
    message: Message.t
}

export function showMessage(text: string, ttl: number): ShowMessage {
    return { type: "showMessage", message: { text, ttl } }
}

export type Effect = NullEffect | ShowMessage
