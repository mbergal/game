export class AssertionError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export function assert(condition: (() => boolean) | boolean, message: string | null = null) {
    if (!(typeof condition === "function" ? condition() : condition)) {
        throw new AssertionError(message || "Assertion failed")
    }
}
