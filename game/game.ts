import { Command } from "../commands"
import { ItemGenerator } from "../objects/item"
import * as Player from "../objects/player"
import * as GameMap from "./map"
import { Message } from "./message"
import * as Score from "./score"
import * as Sprint from "./sprint"
export * as GameMap from "./map"
export * as Score from "./score"

export type t = {
    map: GameMap.GameMap
    score: Score.Score
    itemGenerator: ItemGenerator
    sprint: Sprint.t
    commands: Command[]
    messages: Message[]
    messageTact: number
    player?: Player.Player
}

export type Game = t

export function make(width: number, height: number): t {
    return {
        map: new GameMap.GameMap(width, height, []),
        commands: [],
        itemGenerator: { tact: 0 },
        sprint: Sprint.make(),
        score: Score.make(),
        messages: [],
        messageTact: 0,
    }
}

export function toJson(game: t): object {
    return {
        map: game.map.toJson(),
        score: game.score,
        itemGenerator: game.itemGenerator,
        commands: game.commands,
        messages: game.messages,
        messageTact: game.messageTact,
    }
}

export function message(game: t, m: Message) {
    game.messages.push(m)
}

export interface GameStorage {
    save(json: string): void
    load(): string | null
}

export function save(game: Game, storage: GameStorage) {
    storage.save(JSON.stringify(toJson(game)))
    console.log("Game saved!")
}

export function load(storage: GameStorage): Game | null {
    const objectsStorage = storage.load()
    if (objectsStorage != null) {
        const {
            commands,
            itemGenerator,
            score,
            sprint,
            messages,
            messageTact,
            map,
        }: {
            score: Score.Score
            sprint: Sprint.t
            commands: Command[]
            messages: Message[]
            messageTact: number
            itemGenerator: ItemGenerator
            map: object
        } = JSON.parse(objectsStorage)
        const map_ = GameMap.GameMap.fromJson(map)
        const player = map_.objects.find<Player.t>((x): x is Player.t => x.type === "player")
        return {
            score: score,
            itemGenerator: itemGenerator,
            sprint: sprint,
            messages: messages,
            messageTact: messageTact,
            commands: commands,
            map: map_,
            player: player,
        }
    } else {
        console.log("There is no saved game.")
        return null
    }
}
