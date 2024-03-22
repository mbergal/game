import * as _ from "lodash"
import { Command } from "./commands"
import { Game } from "./game"
import { GameStorage } from "./game/game"
import * as EngineeringLevels from "./game/levels"
import * as Sprint from "./game/sprint"
import * as ItemGenerator from "./game/item_generator"
import { generateRoomDoors, generateRoomWalls, hline, vline } from "./generator"
import { Vector } from "./geometry"
import * as Boss from "./objects/boss"
import * as Footprint from "./objects/footprint"
import { GameObject } from "./objects/object"
import * as Player from "./objects/player"
import { render } from "./renderer"
import { assertUnreachable } from "./utils/utils"
import config from "./game/config"

const height = 25
const width = 80

export function main() {
    const boss: Boss.t = Boss.make()
    let game: Game.t = Game.make(width, height)

    const outer_walls = hline({ x: 0, y: 0 }, width)
        .concat(vline({ x: 0, y: 0 }, height))
        .concat(vline({ x: width - 1, y: 0 }, height))
        .map(
            (point: Vector.t): GameObject => ({
                position: point,
                type: "wall",
                zIndex: 0,
            })
        )

    game.map.add(outer_walls)

    const inner_walls = _.range(0, height, 2)
        .map((y: number) => hline({ x: 0, y }, width))
        .flatMap((x) => x)
        .map(
            (point: Vector.t): GameObject => ({
                type: "wall",
                position: point,
                zIndex: 0,
            })
        )

    game.map.add(inner_walls)

    const room_walls = generateRoomWalls({
        height,
        width,
        wallsPerRow: { min: 3, max: 7 },
    }).map(
        (point: Vector.t): GameObject => ({
            type: "wall",
            position: point,
            zIndex: 0,
        })
    )

    game.map.add(room_walls)

    generateRoomDoors(game.map)
    game.map.add([boss])

    game.player = Player.make(game.map.getRandomEmptyLocation())

    game.map.add([game.player])

    Game.message(game, {
        text: "Welcome to the Rat Race. You need to earn enough money and get out of the system",
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
    game.ticks += 1
    game.score.money += EngineeringLevels.all[game.score.level].rate

    ItemGenerator.tick(game.itemGenerator, game)
    /*eslint no-unused-expressions: "error"*/

    if (config.sprint.startDay * config.dayTicks <= game.ticks && !game.sprint) {
        game.sprint = Sprint.make(game.ticks)
    }

    if (game.sprint) {
        Game.handleEffects(game, Sprint.tick(game.sprint, game))
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

function tick(obj: GameObject, game: Game.t, commands: Command[]): Result {
    let result = { codeBlocks: 0 }
    switch (obj.type) {
        case "boss":
            Boss.tick(obj, game.map)
            break
        case "footprint":
            Footprint.tick(obj, game.map)
            break
        case "player":
            Player.tick(obj, game, commands)
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
