import { Command } from "../commands"
import * as ItemGenerator from "../game/item_generator"
import { Vector } from "../geometry"
import * as Player from "../objects/player"
import { assertUnreachable } from "../utils/utils"
import * as DayOfWeek from "./day_of_week"
import * as Effect from "./effect"
import * as Effects from "./effects"
import * as GameMap from "./map"
import { Message } from "./message"
import * as Plan from "./plan"
import * as Score from "./score"
import * as Sprint from "./sprint"
export * as GameMap from "./map"
export * as Score from "./score"

export type t = {
    map: GameMap.GameMap
    score: Score.Score
    time: GameTime
    itemGenerator: ItemGenerator.t
    sprint: Sprint.t
    commands: Command[]
    messages: Message[]
    messageTact: number
    player?: Player.Player
    plan: Plan.t
    messageStartTime: number | null
}

export type GameTime = {
    day: number
    ticks: number
    dayOfWeek: DayOfWeek.t
}

export type Game = t

export function make(size: Vector.t, plan: Plan.t): t {
    return {
        map: new GameMap.GameMap(size.x, size.y, []),
        commands: [],
        itemGenerator: ItemGenerator.make(),
        sprint: Sprint.make(),
        score: Score.make(),
        messages: [],
        messageTact: 0,
        time: {
            ticks: 0,
            day: 0,
            dayOfWeek: "Sunday",
        },
        plan: plan,
        messageStartTime: null,
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

export function handleEffects(game: t, effects: Generator<Effect.t> | Effects.t) {
    for (const effect of effects) {
        switch (effect.type) {
            case "null":
                break
            case "addImpact":
                game.score.impact += effect.impact
                break
            case "showMessage":
                message(game, effect.message)
                break
            default:
                assertUnreachable(effect)
        }
    }
}
export function message(game: t, m: Message | { text: string[]; ttl: number }) {
    if (m.text instanceof Array) {
        for (const text of m.text) {
            game.messages.push({ text: text, ttl: m.ttl })
        }
    } else {
        game.messages.push({ text: m.text, ttl: m.ttl })
    }
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
            time,
            plan,
            messageStartTime,
        }: {
            score: Score.Score
            sprint: Sprint.t
            commands: Command[]
            messages: Message[]
            messageTact: number
            itemGenerator: ItemGenerator.t
            map: object
            time: GameTime
            plan: Plan.t
            messageStartTime: number
        } = JSON.parse(objectsStorage)
        const map_ = GameMap.GameMap.fromJson(map)
        const player = map_.objects.find<Player.t>((x): x is Player.t => x.type === "player")
        return {
            time: time,
            score: score,
            itemGenerator: itemGenerator,
            sprint: sprint,
            messages: messages,
            messageTact: messageTact,
            commands: commands,
            map: map_,
            player: player,
            plan: plan,
            messageStartTime: messageStartTime,
        }
    } else {
        console.log("There is no saved game.")
        return null
    }
}
