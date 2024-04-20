export type Horizontal = "left" | "right"
export type Vertical = "down" | "up"

export type t = Horizontal | Vertical
export type Rose = Partial<Record<t, true>>

export function reverse(direction: t) {
    switch (direction) {
        case "down":
            return "up"
        case "up":
            return "down"
        case "left":
            return "right"
        case "right":
            return "left"
    }
}

export function toRose(directions: t[]) {
    const rose: Rose = {}
    for (const direction of directions) {
        rose[direction] = true
    }
    return rose
}

export const all: t[] = ["left", "right", "down", "up"]
