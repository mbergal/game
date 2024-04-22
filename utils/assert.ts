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

export function assertUnreachable(_: never): never {
    throw new AssertionError("Didn't expect to get here")
}
