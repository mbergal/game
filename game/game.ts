import { Boss, Developer, GameObject, Player } from "@/objects"
import * as Logging from "@/utils/logging"
import { assertUnreachable } from "@/utils/utils"
import * as Command from "../command"
import * as ItemGenerator from "../game/item_generator"
import { Vector } from "../geometry"
import * as Collapse from "./collapse"
import config from "./config"
import * as Effect from "./effect"
import * as Effects from "./effects"
import * as GameStorage from "./game_storage"
import * as GameTime from "./game_time"
import * as GameMap from "./map"
import { Message } from "./message"
import * as PerformanceReview from "./performance_review"
import * as Plan from "./plan"
import * as Renderer from "./renderer"
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
    developer?: Developer.Developer
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
        time: game.time,
        sprint: game.sprint,
        plan: game.plan,
        messageStartTime: game.messageStartTime,
        collapse: game.collapse,
    }
}

function handleEffects(game: Game, effects: Generator<Effect.Effect> | Effects.Effects) {
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
    const fullTick = (timePassed: number) => {
        Logging.setTime(game.time.ticks)
        game.score.stockPrice =
            100.0 - (100.0 / config.totalDays) * (game.time.ticks / config.dayTicks)
        game.score.money += game.player!.level.rate
        game.time = GameTime.make(game.time.ticks)

        handleEffects(game, Collapse.tick(game))
        ItemGenerator.tick(game.itemGenerator, game)

        if (game.sprint) {
            handleEffects(game, Sprint.tick(game.sprint, { ...game, player: game.player! }))
        }

        handleEffects(game, PerformanceReview.tick(game))

        for (const obj of game.map.objects) {
            objTick(obj, game, game.commands, 1)
        }
        game.commands = []
        Renderer.render(game)
        game.time.ticks += timePassed
    }

    const halfTick = (timePassed: number) => {
        Logging.setTime(game.time.ticks)

        if (game.player!.speedUp) {
            objTick(game.player!, game, game.commands, 0.5)
        }
        if (game.developer!.speedUp) {
            objTick(game.developer!, game, game.commands, 0.5)
        }
        game.commands = []
        Renderer.render(game)
        game.time.ticks += timePassed
    }

    if (!game.player!.speedUp && !game.developer!.speedUp) {
        fullTick(1)
    } else {
        halfTick(0.5)
        fullTick(0.5)
    }
}

function objTick(
    obj: GameObject.GameObject,
    game: Game,
    commands: Command.Command[],
    ticksPassed: number,
) {
    switch (obj.type) {
        case "boss":
            Boss.tick(obj, game.map)
            break
        case "boss.footprint":
            handleEffects(game, Boss.Footprint.tick(obj, game.map))
            break
        case "developer.footprint":
            handleEffects(game, Developer.Footprint.tick(obj, game.map))
            break
        case "player":
            handleEffects(game, Player.tick(obj, game, commands, ticksPassed))
            break
        case "door":
        case "story":
        case "commit":
        case "coffee":
        case "wall":
        case "developer.pathlights":
            break
        case "developer":
            handleEffects(game, Developer.tick(obj, game))
            break
        default:
            assertUnreachable(obj)
    }
}

export function save(game: Game, storage: GameStorage.GameStorage) {
    storage.save(JSON.stringify(toJson(game)))
    logger("Game saved!")
}

export function load(storage: GameStorage.GameStorage): Game | null {
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
            (x): x is Player.Player => x.type === "player",
        )
        const developer = map_.objects.find<Developer.Developer>(
            (x): x is Developer.Developer => x.type === "developer",
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
            developer: developer,
            plan: plan,
            messageStartTime: messageStartTime,
            collapse: collapse,
        }
    } else {
        logger("There is no saved game.")
        return null
    }
}
