import _ from "lodash"
import * as Command from "./command"
import { Game, Collapse, Plan, Sprint, GameTime } from "./game"

import config from "./game/config"

import * as ItemGenerator from "./game/item_generator"
import * as EngineeringLevels from "./game/levels"
import { GameObject } from "./objects"
import * as MazeGenerator from "./generator"
import { Vector } from "./geometry"
import * as Boss from "./objects/boss"
import * as Footprint from "./objects/footprint"

import * as Player from "./objects/player"
import { PerformanceReview } from "./game/performance_review"
import { render } from "./renderer"
import * as Logging from "./utils/logging"
import { assertUnreachable } from "./utils/utils"
import { GameStorage } from "./game/game_storage"
import * as Windows from "./ui/windows"

const MAZE_SIZE: Vector.t = { y: 25, x: 80 }

const logger = Logging.make("main")

Logging.setIsEnabled((name: string) => _.includes(["main", "player", "game"], name))

export function main() {
    const boss: Boss.Boss = Boss.make()
    const plan: Plan.Plan = Plan.generatePlan(0)

    let game: Game.Game = Game.make(MAZE_SIZE, plan)
    MazeGenerator.maze(MAZE_SIZE, game)

    game.map.add([boss])

    game.player = Player.make(game.map.getRandomEmptyLocation())
    game.map.add([game.player])

    Game.message(game, {
        text: [
            "Requiem for a Programmer.",
            "You are in Agile hell.",
            "Earn enough money and get out !!!!!",
            "'*' is you. Use arrow keys to move.",
        ],
        ttl: 3_000,
    })

    let interval = window.setInterval(() => processTick(game), config.tickInterval)

    window.addEventListener("keydown", (event) => {
        logger(`keydown: ${event.key}`)
        switch (event.key) {
            case "+":
                config.tickInterval -= 5
                window.clearInterval(interval)
                interval = window.setInterval(() => processTick(game), config.tickInterval)
                Game.message(game, { text: `Speed increased to ${config.tickInterval}`, ttl: 2 })
                break
            case "-":
                config.tickInterval += 5
                window.clearInterval(interval)
                interval = window.setInterval(() => processTick(game), config.tickInterval)
                Game.message(game, { text: "Speed decreased", ttl: 2 })
                break
            // case "]":
            //     game.score.level += 1
            //     break
            // case "[":
            //     game.score.level -= 1
            //     break
            case "s":
                save(game)
                break
            case "l": {
                const loaded = load()
                if (loaded != null) {
                    game = loaded
                }
                break
            }

            default: {
                const command = getCommand(event.key)
                if (command != null) {
                    game.commands.push(command)
                }
                break
            }
        }
    })

    render(game)
}

function getCommand(key: string): Command.Command | null | undefined {
    switch (key) {
        case "ArrowUp":
            return { type: "move", direction: "up" }
        case "ArrowDown":
            return { type: "move", direction: "down" }
        case "ArrowLeft":
            return { type: "move", direction: "left" }
        case "ArrowRight":
            return { type: "move", direction: "right" }
        case "Enter":
            return { type: "use" }
        case "End":
        case "Delete":
            return { type: "stop" }
        case " ":
            return { type: "drop" }
    }
}

const localStorage: GameStorage = {
    save(json: string): void {
        window.localStorage.setItem("map", json)
    },

    load(): string | null {
        const objectsStorage = window.localStorage.getItem("map")
        return objectsStorage
    },
}

export function save(game: Game.Game) {
    Game.save(game, localStorage)
    console.log("Game saved!")
}

export function load(): Game.Game | null {
    return Game.load(localStorage)
}

function processTick(game: Game.Game) {
    const fullTick = () => {
        Logging.setTime(game.time.ticks)
        game.score.stockPrice =
            100.0 - (100.0 / config.totalDays) * (game.time.ticks / config.dayTicks)
        game.score.money += game.player!.level.rate
        game.time = GameTime.make(game.time.ticks)

        Game.tick(game)
        Game.handleEffects(game, Collapse.tick(game))
        ItemGenerator.tick(game.itemGenerator, game)

        if (game.sprint) {
            Game.handleEffects(game, Sprint.tick(game.sprint, { ...game, player: game.player! }))
        }

        Game.handleEffects(game, PerformanceReview.tick(game))

        for (const obj of game.map.objects) {
            const result = tick(obj, game, game.commands, 1)
        }
        game.commands = []
        render(game)
    }

    const playerTick = () => {
        Logging.setTime(game.time.ticks)
        game.score.stockPrice =
            100.0 - (100.0 / config.totalDays) * (game.time.ticks / config.dayTicks)
        game.score.money += game.player!.level.rate
        game.time = GameTime.make(game.time.ticks)
        const result = tick(game.player!, game, game.commands, 0.5)
        game.commands = []
        render(game)
    }

    if (!game.player!.flags.spedUp) {
        fullTick()
        game.time.ticks += 1
    } else {
        playerTick()
        game.time.ticks += 0.5
        fullTick()
        game.time.ticks += 0.5
    }
}

interface Result {
    codeBlocks: number
}

function tick(
    obj: GameObject.t,
    game: Game.Game,
    commands: Command.Command[],
    ticksPassed: number
) {
    switch (obj.type) {
        case "boss":
            Boss.tick(obj, game.map)
            break
        case "footprint":
            Game.handleEffects(game, Footprint.tick(obj, game.map))
            break
        case "player":
            Game.handleEffects(game, Player.tick(obj, game, commands, ticksPassed))
            break
        case "door":
        case "story":
        case "commit":
        case "coffee":
        case "wall":
            break
        default:
            assertUnreachable(obj)
    }
}

Windows.show(new Windows.TextWindow("Hello, world!"))

// main()
