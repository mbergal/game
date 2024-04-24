export * as Bfs from "./bfs"
export * from "./assert"
export * as Format from "./format"
export * as Random from "./random"
export * as Logging from "./logging"

type Entries<T> = {
    [K in keyof T]: [K, T[K]]
}[keyof T][]

export function getEntries<T extends object>(obj: T) {
    return Object.entries(obj) as Entries<T>
}
