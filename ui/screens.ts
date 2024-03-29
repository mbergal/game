import { Vector } from "../geometry"

const buffer = []

export function render(position: Vector.Vector, chars: string[][]) {
    const contentBlock = document.getElementById("content")
    contentBlock!.innerHTML = chars.map((x) => x.join("")).join("\n")
}

export const size = { x: 80, y: 24 }
