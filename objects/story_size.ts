export type Size = "small" | "medium" | "large"

export function toString(size: Size) {
    switch (size) {
        case "small":
            return "small"
        case "medium":
            return "medium"
        case "large":
            return "large"
    }
}
