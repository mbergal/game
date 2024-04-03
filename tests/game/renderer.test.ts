import { describe, test, expect } from "vitest"
import { showMessage } from "../../game/renderer"

describe("showMessage", () => {
    test("shows non-expired message", () => {
        const shown = showMessage({ messages: [{ text: "A", ttl: 1 }], messageStartTime: 0 })
        expect(shown).toEqual("A")
    })
    test("removes expired message and shows blank text if no messages are left", () => {
        const shown = showMessage({ messages: [{ text: "A", ttl: 1 }], messageStartTime: 1 })
        expect(shown).toEqual("")
    })
    test("removes first expired message and shows the next line", () => {
        const state = {
            messages: [
                { text: "A", ttl: 1 },
                { text: "B", ttl: 1 },
            ],
            messageStartTime: null,
        }
        const shown = showMessage(state)
        expect(shown).toEqual("B")
        expect(state.messages).toEqual([{ text: "B", ttl: 1 }])
    })
    test("4", () => {
        const state = {
            messages: [
                { text: "A", ttl: 10 },
                { text: "B", ttl: 1 },
            ],
            messageStartTime: null,
        }
        const shown = showMessage(state)
        expect(shown).toEqual("B")
        expect(state.messages).toEqual([{ text: "B", ttl: 1 }])
    })
})
