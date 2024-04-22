export * as Bfs from "./bfs"
export * from "./assert"

type Entries<T> = {
    [K in keyof T]: [K, T[K]]
}[keyof T][]

export function getEntries<T extends object>(obj: T) {
    return Object.entries(obj) as Entries<T>
}
