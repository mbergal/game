export interface GameStorage {
    save(json: string): void
    load(): string | null
}
