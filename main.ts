import * as _ from "lodash"
import { Boss, boss_tick } from "./boss"
import { generateRoomDoors, generateRoomWalls, hline, vline } from "./generator"
import { Vector, n, s } from "./geometry"
import { GameMap } from "./map"
import { GameObject } from "./object"
import { render } from "./renderer"

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
    const boss: Boss = {
        position: {
            x: 0,
            y: 0,
        },
        type: "boss",
        zIndex: 1,
        state: { type: "stopped", previous_direction: null },
        // tick: (objs: GameObject[]) => boss_move(),
    }

    let map = new GameMap(width, height, [])

    const outer_walls = hline({ x: 0, y: 0 }, width)
        .concat(vline({ x: 0, y: 0 }, height))
        .concat(vline({ x: width - 1, y: 0 }, height))
        .map(
            (point: Vector): GameObject => ({
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
            (point: Vector): GameObject => ({
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
        (point: Vector): GameObject => ({
            type: "wall",
            position: point,
            zIndex: 0,
        })
    )

    map.add(room_walls)

    const room_doors = generateRoomDoors(map)
    map.add([boss])
    window.setInterval(() => process_tick(map), 500)

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
        }
    })

    render(map)
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
            boss_tick(obj, map)
        case "wall":
            break
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
