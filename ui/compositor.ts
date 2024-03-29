import { Vector } from "@/geometry"
import * as Windows from "./windows"

type Composition = string[][]

function make(size: Vector.Vector): Composition {
    for (let y = 0; y < Screen.size.y; y++) {
        composition[y] = []
        for (let x = 0; x < Screen.size.x; x++) {
            composition[y][x] = " "
        }
    }
}

function compose(composition: string[][], window: string[][]) {
    for (let y = 0; y < window.length; y++) {
        for (let x = 0; x < window[y].length; x++) {
            composition[y][x] = window[y][x]
        }
    }
    return composition
}

function render(windows: Windows.Window[]) {
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
