export enum Size {
    small,
    medium,
    large,
}

export function toString(size: Size) {
    switch (size) {
        case Size.small:
            return "small"
        case Size.medium:
            return "medium"
        case Size.large:
            return "large"
    }
}
