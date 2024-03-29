import { Vector } from "./geometry"

const buffer = []

export function render(position: Vector.Vector, lines: string[]) {
    const contentBlock = document.getElementById("content")
    contentBlock!.innerHTML = lines.map((x) => x).join("\n")
}

export const size = { x: 80, y: 24 }
