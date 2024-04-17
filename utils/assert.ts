export class AssertionError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new AssertionError(msg ?? "")
    }
}
