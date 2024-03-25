import * as _ from "lodash"
import { Command } from "./commands"
import { Game } from "./game"
import config from "./game/config"
import { GameStorage } from "./game/game"
import * as ItemGenerator from "./game/item_generator"
import * as EngineeringLevels from "./game/levels"
import * as Sprint from "./game/sprint"
import { Vector } from "./geometry"
import * as Boss from "./objects/boss"
import * as Footprint from "./objects/footprint"
import { t } from "./objects/object"
import * as Player from "./objects/player"
import * as Plan from "./game/plan"
import * as MazeGenerator from "./generator"
import { render } from "./renderer"
import { assertUnreachable } from "./utils/utils"
import * as DayOfWeek from "./game/day_of_week"

const MAZE_SIZE: Vector.t = { y: 25, x: 80 }

export function main() {
    const boss: Boss.t = Boss.make()
    const plan: Plan.t = Plan.generatePlan(0)

    let game: Game.t = Game.make(MAZE_SIZE, plan)
    MazeGenerator.maze(MAZE_SIZE, game)

    game.map.add([boss])

    game.player = Player.make(game.map.getRandomEmptyLocation())
    game.map.add([game.player])

    Game.message(game, {
        text: "Requiem for a Programmer. You are in hell. Get enough money and get out !!!!!",
        ttl: 100,
    })

    let interval = window.setInterval(() => processTick(game), config.tickInterval)

    window.addEventListener("keydown", (event) => {
        console.log("keydown:", event.key)
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

function getCommand(key: string): Command | null | undefined {
    switch (key) {
        case "ArrowUp":
            return { type: "move", direction: "up" }
        case "ArrowDown":
            return { type: "move", direction: "down" }
        case "ArrowLeft":
            return { type: "move", direction: "left" }
        case "ArrowRight":
            return { type: "move", direction: "right" }
        case "Insert":
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

export function save(game: Game.t) {
    Game.save(game, localStorage)
    console.log("Game saved!")
}

export function load(): Game.t | null {
    return Game.load(localStorage)
}

function processTick(game: Game.t) {
    game.time.ticks += 1
    game.score.stockPrice = 100.0 - (100.0 / config.totalDays) * (game.time.ticks / config.dayTicks)
    game.score.money += EngineeringLevels.all[game.score.level].rate
    game.time.day = Math.floor(game.time.ticks / config.dayTicks)
    game.time.dayOfWeek = DayOfWeek.all[game.time.day % 7]

    ItemGenerator.tick(game.itemGenerator, game)
    /*eslint no-unused-expressions: "error"*/

    if (game.sprint) {
        Game.handleEffects(
            game,
            Sprint.tick(game.sprint, { map: game.map, ticks: game.time.ticks, plan: game.plan })
        )
    }

    for (const obj of game.map.objects) {
        const result = tick(obj, game, game.commands)
        game.score.codeBlocks += result.codeBlocks
    }
    game.commands = []
    render(game)
}

interface Result {
    codeBlocks: number
}

function tick(obj: t, game: Game.t, commands: Command[]): Result {
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

/**
 *
 * Bosses
 * CEO 
   ** Fucks CIO - CIO moves faster and tries to fuck VP
   ** Team email - ????
   ** Bonus
 
 * CIO 
   ** Fucks VP - VPs moves faster and tries to fuck dev
   ** Team email - ????

 * VP -- fucks dev
 *
 * 
 * Inventory:
    * PR
    
 * Life:
 * Money: 
 * Fuck You Money: $60000 - quit
 * Happiness
 * Delivery: 

 */
