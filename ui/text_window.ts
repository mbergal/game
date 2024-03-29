import { Vector } from "@/geometry"
import * as Windows from "./windows"

export class TextWindow implements Windows.Window {
    contents: string[]
    position: Vector.Vector
    size: Vector.Vector
    keydown: ((window: Windows.Window, event: KeyboardEvent) => void) | null = null

    constructor(text: string) {
        this.position = { x: 0, y: 0 }
        const splitText = formatText(text)
        const width = splitText[0].length
        const height = splitText.length
        const topLine = "┏━" + "━".repeat(width) + "━┓"
        const bottomLine = "┗━" + "━".repeat(width) + "━┛"

        this.contents = [topLine].concat(splitText.map((x) => "┃ " + x + " ┃")).concat([bottomLine])
        this.size = { x: this.contents[0].length, y: this.contents.length }
    }

    show() {}

    render(): string[] {
        return this.contents
    }

    onKeyPress(callback: (window: Windows.Window, event: KeyboardEvent) => void) {
        this.keydown = callback
        return this
    }

    hide() {}

    interval() {}
}

function formatText(text: string) {
    const lines = text.split("\n")
    const maxLength = Math.max(...lines.map((x) => x.length))
    return lines.map((x) => x.padEnd(maxLength, " "))
}
