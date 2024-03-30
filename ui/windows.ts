import _ from "lodash"
import { Vector } from "../geometry"
import * as Composition from "./composition"
import * as Screen from "./screens"

export class Window {
    position: Vector.Vector
    size: Vector.Vector

    constructor() {
        this.position = Vector.zero
        this.size = Vector.zero
    }

    hide(): void {}
    show(): void {}
    render(): string[] {
        return []
    }

    keydown: ((window: Window, event: KeyboardEvent) => void) | null = null

    clearInterval(id: number | undefined): void {
        window.clearInterval(id)
    }
    setInterval(handler: () => void, timeout: number): number {
        return window.setInterval(() => {
            if (isFocused(this)) {
                handler()
            }
        }, timeout)
    }
}

export type KeyboardEvent = {
    key: string
}

function isFocused(window: Window): boolean {
    return _.last(windows) === window
}

export let windows: Window[] = []

export function focused(): Window | null {
    return _.last(windows) ?? null
}

export function updateScreen() {
    Composition.render(windows)
}
export function show(window: Window): Window {
    windows.push(window)
    window.show()
    updateScreen()
    return window
}

export function hide(window: Window) {
    window.hide()
    windows.splice(windows.indexOf(window), 1)
    updateScreen()
}

export function move(position: Vector.Vector, window: Window): Window {
    window.position = position
    updateScreen()
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
