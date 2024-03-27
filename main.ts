import { Command } from "./command"
import { Game } from "./game"
import * as Collapse from "./game/collapse"
import config from "./game/config"
import { GameStorage } from "./game/game"
import * as GameTime from "./game/game_time"
import * as ItemGenerator from "./game/item_generator"
import * as EngineeringLevels from "./game/levels"
import * as Plan from "./game/plan"
import * as Sprint from "./game/sprint"
import * as MazeGenerator from "./generator"
import { Vector } from "./geometry"
import * as Boss from "./objects/boss"
import * as Footprint from "./objects/footprint"
import { t } from "./objects/object"
import * as Player from "./objects/player"
import { Logging } from "./utils/logging"
import { render } from "./renderer"
import { assertUnreachable } from "./utils/utils"
import _ from "lodash"

const MAZE_SIZE: Vector.t = { y: 25, x: 80 }

const logger = Logging.make("main")

Logging.setIsEnabled((name: string) => _.includes(["main", "player"], name))

export function main() {
    const boss: Boss.t = Boss.make()
    const plan: Plan.Plan = Plan.generatePlan(0)

    let game: Game.t = Game.make(MAZE_SIZE, plan)
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
            case "]":
                game.score.level += 1
                break
            case "[":
                game.score.level -= 1
                break
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

function getCommand(key: string): Command.t | null | undefined {
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
        case " ":
            return { type: "stop" }
        case "Delete":
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

export function save(game: Game.t) {
    Game.save(game, localStorage)
    console.log("Game saved!")
}

export function load(): Game.t | null {
    return Game.load(localStorage)
}

function processTick(game: Game.t) {
    game.score.stockPrice = 100.0 - (100.0 / config.totalDays) * (game.time.ticks / config.dayTicks)
    game.score.money += EngineeringLevels.all[game.score.level].rate
    game.time = GameTime.make(game.time.ticks)

    Game.tick(game)
    Game.handleEffects(game, Collapse.tick(game))
    ItemGenerator.tick(game.itemGenerator, game)

    if (game.sprint) {
        Game.handleEffects(game, Sprint.tick(game.sprint, { ...game, player: game.player! }))
    }

    for (const obj of game.map.objects) {
        const result = tick(obj, game, game.commands)
        game.score.codeBlocks += result.codeBlocks
    }
    game.commands = []
    render(game)
    game.time.ticks += 1
}

interface Result {
    codeBlocks: number
}

function tick(obj: t, game: Game.t, commands: Command.t[]): Result {
    let result = { codeBlocks: 0 }
    switch (obj.type) {
        case "boss":
            Boss.tick(obj, game.map)
            break
        case "footprint":
            Footprint.tick(obj, game.map)
            break
        case "player":
            Game.handleEffects(game, Player.tick(obj, game, commands))
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
    return result
}

main()
