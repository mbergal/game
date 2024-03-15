export type t = "left" | "right" | "down" | "up"

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
