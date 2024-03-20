import * as _ from "lodash"
import { Command } from "./commands"
import { generateRoomDoors, generateRoomWalls, hline, vline } from "./generator"
import { Vector } from "./geometry"
import { GameMap } from "./game/map"
import { Score } from "./game"
import * as Boss from "./objects/boss"
import * as EngineeringLevels from "./game/levels"
import * as Footprint from "./objects/footprint"
import { GameObject } from "./objects/object"
import * as Player from "./objects/player"
import { render } from "./renderer"
import { assertUnreachable } from "./utils/utils"
import { Game } from "./game"
import { generateAnItem } from "./game/item_generator"
import { generateSprint } from "./game/sprint"
import { GameStorage } from "./game/game"

const TICK_INTERVAL = 100
// class Game {
//   tick(): void {
//     for (const obj of this.objects) {
//       obj.tick();
//     }
//   }
//   objects: GameObject[];
//   map: GameMap;
// }

// class GameMap {}

// class GameObject {
//   tick(): void {}
// }

// type Tick = () => void;

// class Game {
//   tick(): void {
//     for (const object of this.objects) {
//       object.tick();
//     }
//   }
//   objects: GameObject[];
//   map: GameMap;
// }

// class GameMap {}

interface OutOfBounds {
    type: "out_of_bounds"
}

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

    const room_doors = generateRoomDoors(game.map)
    game.map.add([boss])

    game.player = Player.make(game.map.getRandomEmptyLocation())

    game.map.add([game.player])

    Game.message(game, "Welcome to the Rat Race", 30)

    window.setInterval(() => processTick(game), TICK_INTERVAL)

    window.addEventListener("keydown", (event) => {
        console.log("keydown:", event.key)
        switch (event.key) {
            case "s":
                save(game)
                break
            case "l":
                const loaded = load()
                if (loaded != null) {
                    game = loaded
                }
            default:
                const command = getCommand(event.key)
                if (command != null) {
                    game.commands.push(command)
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
    game.score.ticks += 1
    game.score.money += EngineeringLevels.all[game.score.level].rate
    const item = generateAnItem(game)
    for (const obj of game.map.objects) {
        const result = tick(obj, game.map, game.commands)
        game.score.codeBlocks += result.codeBlocks
    }
    if (game.score.ticks % 1000 == 1) {
        generateSprint(game.map)
    }
    game.commands = []
    render(game)
}

interface Result {
    codeBlocks: number
}

function tick(obj: GameObject, map: GameMap, commands: Command[]): Result {
    let result = { codeBlocks: 0 }
    switch (obj.type) {
        case "boss":
            Boss.tick(obj, map)
            break
        case "footprint":
            Footprint.tick(obj, map)
            break
        case "player":
            result = Player.tick(obj, map, commands)
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
