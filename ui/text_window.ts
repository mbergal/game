import * as Windows from "./windows"

export class TextWindow extends Windows.Window {
    contents: string[]
    keydown: ((window: Windows.Window, event: Windows.KeyboardEvent) => void) | null = null

    constructor(text: string) {
        super()
        this.position = { x: 0, y: 0 }
        const splitText = formatText(text)
        const width = splitText[0].length

        const topLine = "┏━" + "━".repeat(width) + "━┓"
        const bottomLine = "┗━" + "━".repeat(width) + "━┛"

        this.contents = [topLine].concat(splitText.map((x) => "┃ " + x + " ┃")).concat([bottomLine])
        this.size = { x: this.contents[0].length, y: this.contents.length }
    }

    render(): string[] {
        return this.contents
    }

    onKeyPress(callback: (window: Windows.Window, event: Windows.KeyboardEvent) => void) {
        this.keydown = callback
        return this
    }
}

function formatText(text: string) {
    const lines = text.split("\n")
    const maxLength = Math.max(...lines.map((x) => x.length))
    return lines.map((x) => x.padEnd(maxLength, " "))
}
