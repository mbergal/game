import { Command } from "../command"
import * as ItemGenerator from "../game/item_generator"
import { Vector } from "../geometry"
import * as Player from "../objects/player"
import { assertUnreachable } from "../utils/utils"
import { Effect } from "./effect"
import { Effects } from "./effects"
import { GameTime } from "./game_time"
import * as GameMap from "./map"
import { Message } from "./message"
import { Plan } from "./plan"
import * as Score from "./score"
import { Sprint } from "./sprint"
export * as GameMap from "./map"
export * as Score from "./score"
import { Collapse } from "./collapse"
import { Logging } from "../utils/logging"

const logger = Logging.make("game")

export type t = {
    map: GameMap.GameMap
    score: Score.Score
    time: GameTime.t
    itemGenerator: ItemGenerator.t
    sprint: Sprint.t
    commands: Command.t[]
    messages: Message[]
    messageTact: number
    player?: Player.Player
    plan: Plan.t
    messageStartTime: number | null
    collapse: Collapse.t | null
}

export type Game = t

export function make(size: Vector.Vector, plan: Plan.t): t {
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
        collapse: null,
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
            logger("message: " + text)
            game.messages.push({ text: text, ttl: m.ttl })
        }
    } else {
        game.messages.push({ text: m.text, ttl: m.ttl })
    }
}

export function tick(game: t) {
    const events = game.plan.get(game.time.ticks)
    if (events) {
        for (const event of events) {
            switch (event.type) {
                case "createBacklogIssue":
                case "groomBacklogEnd":
                case "groomBacklogStart":
                case "sprintDayEnd":
                case "sprintDayStart":
                case "sprintStart":
                case "sprintEnd":
                case "weekendStart":
                case "weekendEnd":
                case "gameStarted":
                case "collapseStart":
                case "dayStarted":
                case "gameEnded":
                    logger(JSON.stringify(event))
                    break
                default:
                    assertUnreachable(event)
            }
        }
    }
}

export interface GameStorage {
    save(json: string): void
    load(): string | null
}

export function save(game: Game, storage: GameStorage) {
    storage.save(JSON.stringify(toJson(game)))
    logger("Game saved!")
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
            collapse,
        }: {
            score: Score.Score
            sprint: Sprint.t
            commands: Command.t[]
            messages: Message[]
            messageTact: number
            itemGenerator: ItemGenerator.t
            map: object
            time: GameTime.t
            plan: Plan.t
            messageStartTime: number
            collapse: Collapse.Collapse
        } = JSON.parse(objectsStorage)
        const map_ = GameMap.GameMap.fromJson(map)
        const player = map_.objects.find<Player.Player>(
            (x): x is Player.Player => x.type === "player"
        )
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
            collapse: collapse,
        }
    } else {
        logger("There is no saved game.")
        return null
    }
}
