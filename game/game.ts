import { Player } from "@/objects"
import * as Logging from "@/utils/logging"
import { assertUnreachable } from "@/utils/utils"
import * as Command from "../command"
import * as ItemGenerator from "../game/item_generator"
import { Vector } from "../geometry"
import * as Collapse from "./collapse"
import * as Effect from "./effect"
import * as Effects from "./effects"
import { GameStorage } from "./game_storage"
import * as GameTime from "./game_time"
import * as GameMap from "./map"
import { Message } from "./message"
import * as Plan from "./plan"
import * as Score from "./score"
import * as Sprint from "./sprint"
export * as GameMap from "./map"
export * as Score from "./score"

const logger = Logging.make("game")

export type Game = {
    map: GameMap.GameMap
    score: Score.Score
    time: GameTime.GameTime
    itemGenerator: ItemGenerator.ItemGenerator
    sprint: Sprint.Sprint
    commands: Command.Command[]
    messages: Message[]
    messageTact: number
    player?: Player.Player
    plan: Plan.Plan
    messageStartTime: number | null
    collapse: Collapse.Collapse | null
}

export function make(size: Vector.Vector, plan: Plan.Plan): Game {
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

export function toJson(game: Game): object {
    return {
        map: game.map.toJson(),
        score: game.score,
        itemGenerator: game.itemGenerator,
        commands: game.commands,
        messages: game.messages,
        messageTact: game.messageTact,
    }
}

export function handleEffects(game: Game, effects: Generator<Effect.Effect> | Effects.Effects) {
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
export function message(game: Game, m: Message | { text: string[]; ttl: number }) {
    if (m.text instanceof Array) {
        for (const text of m.text) {
            logger("message: " + text)
            game.messages.push({ text: text, ttl: m.ttl })
        }
    } else {
        game.messages.push({ text: m.text, ttl: m.ttl })
    }
}

export function tick(game: Game) {
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
                case "performanceReview":
                case "gameEnded":
                    logger(JSON.stringify(event))
                    break
                default:
                    assertUnreachable(event)
            }
        }
    }
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
            commands: Command.Command[]
            messages: Message[]
            messageTact: number
            itemGenerator: ItemGenerator.ItemGenerator
            map: object
            time: GameTime.GameTime
            plan: Plan.Plan
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
