import { Vector } from "@/geometry"
import * as Windows from "./windows"
import * as Screen from "./screens"

type Composition = string[][]

function make(size: Vector.Vector): Composition {
    const composition: Composition = []
    for (let y = 0; y < Screen.size.y; y++) {
        composition[y] = []
        for (let x = 0; x < Screen.size.x; x++) {
            composition[y][x] = " "
        }
    }
    return composition
}

function compose(composition: string[][], position: Vector.Vector, window: string[][]) {
    for (let y = 0; y < window.length; y++) {
        for (let x = 0; x < window[y].length; x++) {
            composition[position.y + y][position.x + x] = window[y][x]
        }
    }
    return composition
}

export function render(windows: Windows.Window[]) {
    let composition = make(Screen.size)

    // reduce
    for (const window of windows) {
        composition = compose(
            composition,
            window.position,
            window.render().map((x) => x.split(""))
        )
    }
    Screen.render(Vector.zero, composition)
}
