import * as _ from "lodash"
import { Command } from "./commands"
import { generateRoomDoors, generateRoomWalls, hline, vline } from "./generator"
import { Vector } from "./geometry"
import { GameMap } from "./game/map"
import * as Boss from "./objects/boss"
import * as Item from "./objects/item"
import * as Footprint from "./objects/footprint"
import { GameObject } from "./objects/object"
import * as Player from "./objects/player"
import { render } from "./renderer"
import { assertUnreachable } from "./utils/utils"
import { Game } from "./game"

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
    const boss: Boss.Boss = {
        position: {
            x: 0,
            y: 0,
        },
        type: "boss",
        zIndex: 10,
        state: { type: "stopped", previous_direction: null },
        // tick: (objs: GameObject[]) => boss_move(),
    }
    const game: Game = {
        map: new GameMap(width, height, []),
        commands: [],
        itemGenerator: { tact: 0 },
        score: {
            ticks: 0,
        },
    }

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

    const player: Player.Player = {
        type: "player",
        zIndex: 1000,
        direction: null,
        position: game.map.getRandomEmptyLocation(),
        tact: 0,
        commands: [],
    }

    game.map.add([player])

    window.setInterval(() => processTick(game), TICK_INTERVAL)

    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "s":
                save(game.map)
                break
            case "l":
                const loaded = load()
                if (loaded != null) {
                    game.map = loaded
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
    }
}

export function save(map: GameMap) {
    window.localStorage.setItem("map", JSON.stringify(map.toJson()))
    console.log("Game saved!")
}

export function load(): GameMap | null {
    const objectsStorage = window.localStorage.getItem("map")
    if (objectsStorage != null) {
        const { width, height, objects }: { width: number; height: number; objects: GameObject[] } =
            JSON.parse(objectsStorage)
        return new GameMap(width, height, objects)
    } else {
        console.log("There is no saved game.")
        return null
    }
}

function generateAnItem(game: Game) {
    if (game.itemGenerator.tact > 100) {
        game.itemGenerator.tact = 0
        const item = Item.make(game.map.getRandomEmptyLocation())
        game.map.add([item])
    } else {
        game.itemGenerator.tact += 1
        return null
    }
}
function processTick(game: Game) {
    game.score.ticks += 1
    const item = generateAnItem(game)
    for (const obj of game.map.objects) {
        tick(obj, game.map, game.commands)
    }
    game.commands = []
    render(game)
}

function tick(obj: GameObject, map: GameMap, commands: Command[]) {
    switch (obj.type) {
        case "boss":
            Boss.tick(obj, map)
        case "wall":
            break
        case "footprint":
            Footprint.tick(obj, map)
            break
        case "player":
            Player.tick(obj, map, commands)
            break
        case "item":
            break
        default:
            assertUnreachable(obj)
    }
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
