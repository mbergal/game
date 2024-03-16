import * as _ from "lodash"
import { Command } from "./commands"
import { generateRoomDoors, generateRoomWalls, hline, vline } from "./generator"
import { Vector } from "./geometry"
import { GameMap } from "./map"
import * as Boss from "./objects/boss"
import * as Footprint from "./objects/footprint"
import { GameObject } from "./objects/object"
import * as Player from "./objects/player"
import { render } from "./renderer"
import { assertUnreachable } from "./utils"

const TICK_INTERVAL = 50
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

    let map = new GameMap(width, height, [])

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

    map.add(outer_walls)

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

    map.add(inner_walls)

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

    map.add(room_walls)

    const room_doors = generateRoomDoors(map)
    map.add([boss])

    const player: Player.Player = {
        type: "player",
        zIndex: 1000,
        direction: null,
        position: map.getRandomEmptyLocation(),
        tact: 0,
    }

    map.add([player])

    window.setInterval(() => process_tick(map), TICK_INTERVAL)

    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "s":
                save(map)
                break
            case "l":
                const loaded = load()
                if (loaded != null) {
                    map = loaded
                }
            default:
                const command = getCommand(event.key)
                if (command != null) {
                    processCommand(command, map)
                }
        }
    })

    render(map)
}

function processCommand(command: Command, map: GameMap) {
    for (const obj of map.objects) {
        switch (obj.type) {
            case "boss":
            case "footprint":
            case "wall":
                break
            case "player":
                Player.command(obj, command, map)
                break
            default:
                assertUnreachable(obj)
        }
    }
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

function process_tick(map: GameMap) {
    for (const obj of map.objects) {
        tick(obj, map)
    }
    render(map)
}

function tick(obj: GameObject, map: GameMap) {
    switch (obj.type) {
        case "boss":
            Boss.tick(obj, map)
        case "wall":
            break
        case "footprint":
            Footprint.tick(obj, map)
            break
        case "player":
            Player.tick(obj, map)
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
