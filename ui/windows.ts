import { Vector } from "../geometry"
import * as Screen from "./screens"

export interface Window {
    render(): string[]
}

export const windows: Window[] = []

export function show(window: Window) {
    windows.push(window)
    window.show()
    rerender()
}

function rerender() {
    for (let y = 0; y < Screen.size.y; y++) {
        composition[y] = []
        for (let x = 0; x < Screen.size.x; x++) {
            composition[y][x] = " "
        }
    }

    for (const window of windows) {
        composition = compose(
            composition,
            window.render().map((x) => x.split(""))
        )
    }
    Screen.render(Vector.zero, composition)
}
export function hide(window: Window) {
    windows.splice(windows.indexOf(window), 1)
    window.hide()
}

export class TextWindow implements Window {
    contents: string[]

    constructor(text: string) {
        const splitText = formatText(text)
        const width = splitText[0].length
        const height = splitText.length
        const topLine = "┏━" + "━".repeat(width) + "━┓"
        const bottomLine = "┗━" + "━".repeat(width) + "━┛"

        this.contents = [topLine].concat(splitText.map((x) => "┃ " + x + " ┃")).concat([bottomLine])
    }

    show() {}

    render(): string[] {
        return this.contents
    }

    size() {
        return { x: this.contents[0].length, y: this.contents.length }
    }

    hide() {}

    keydown(event: KeyboardEvent) {}

    interval() {}
}

function formatText(text: string) {
    const lines = text.split("\n")
    const maxLength = Math.max(...lines.map((x) => x.length))
    return lines.map((x) => x.padEnd(maxLength, " "))
}
