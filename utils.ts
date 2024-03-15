export function assertUnreachable(x: never): never {
    throw new Error("Didn't expect to get here")
}

type Entries<T> = {
    [K in keyof T]: [K, T[K]]
}[keyof T][]

export function getEntries<T extends object>(obj: T) {
    return Object.entries(obj) as Entries<T>
}
