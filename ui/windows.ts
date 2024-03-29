import { Vector } from "../geometry"
import * as Composition from "./composition"
import * as Screen from "./screens"

export interface Window {
    position: Vector.Vector
    size: Vector.Vector
    render(): string[]
}

export const windows: Window[] = []

export function show(window: Window): Window {
    windows.push(window)
    window.show()
    Composition.render(windows)
    return window
}

export function hide(window: Window) {
    windows.splice(windows.indexOf(window), 1)
    window.hide()
}

export function move(position: Vector.Vector, window: Window): Window {
    window.position = position
    Composition.render(windows)
    return window
}

export function center(window: Window): Window {
    move(
        {
            x: Math.floor((Screen.size.x - window.size.x) / 2),
            y: Math.floor((Screen.size.y - window.size.y) / 2),
        },
        window
    )
    return window
}

export class TextWindow implements Window {
    contents: string[]
    position: Vector.Vector
    size: Vector.Vector

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

    hide() {}

    keydown(event: KeyboardEvent) {}

    interval() {}
}

function formatText(text: string) {
    const lines = text.split("\n")
    const maxLength = Math.max(...lines.map((x) => x.length))
    return lines.map((x) => x.padEnd(maxLength, " "))
}
