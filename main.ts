import * as _ from "lodash";
import { Boss, boss_tick } from "./boss";
import { Vector, n, s } from "./geometry";
import { GameMap } from "./map";
import { GameObject } from "./object";
import { getInt, getInts } from "./random"
import { generateRoomDoors, generateRoomWalls, hline, vline } from "./generator";

function assertUnreachable(x: never): never {
  throw new Error("Didn't expect to get here");
}
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



const height = 25;
const width = 80;


function render(map: GameMap) {
  const buffer = [];
  for (let j = 0; j <= height; j++) {
    const row = [];

    for (let i = 0; i < width; i++) {
      row.push(" ");
    }
    buffer.push(row);
  }

  for (const obj of objs) {
    const t = obj.type;
    switch (t) {
      case "wall":
        if (map.is_at(n(obj.position), "wall") && map.is_at(s(obj.position), "wall")) {
          buffer[obj.position.y][obj.position.x] = "|";
        }
        else buffer[obj.position.y][obj.position.x] = "-";
        break;
      case "boss":
        buffer[obj.position.y][obj.position.x] = "*";
        break;
      default:
        assertUnreachable(t);
    }
  }

  process.stdout.moveCursor(0, 0);
  for (let i = 0; i < height; ++i) {
    process.stdout.write(buffer[i].join(""));
    process.stdout.write("\n");
  }
  process.stdout.write("Week: XXXXXX, Life: XXXXX, Money: XXXXX");
}



export function main() {

  const boss: Boss = {
    position: {
      x: 0,
      y: 0
    },
    type: "boss",
    state: { type: "stopped", previous_direction: null },
    // tick: (objs: GameObject[]) => boss_move(),
  };

  const map = new GameMap([], width, height)

  const outer_walls = hline({ x: 0, y: 0 }, width)
    .concat(vline({ x: 0, y: 0 }, height))
    .concat(vline({ x: width - 1, y: 0 }, height))
    .map((point: Vector): GameObject => ({
      position: point,
      type: "wall",
    }))

  map.add(outer_walls)

  const inner_walls = _.range(0, height, 2)
    .map((y: number) => hline({ x: 0, y }, width))
    .flatMap(x => x)
    .map(
      (point: Vector): GameObject => ({
        type: "wall",
        position: point,
      }))

  map.add(inner_walls)

  const room_walls = generateRoomWalls({
    height,
    width,
    wallsPerRow: { min: 3, max: 7 }
  }).map((point: Vector): GameObject => (
    {
      type: "wall",
      position: point
    }
  ))

  map.add(room_walls)

  const room_doors = generateRoomDoors(map)
  map.add([boss])

  render(map);
  // nextTick(map)
}

function nextTick(objs: GameObject[], map: GameMap) {
  for (const obj of objs) {
    tick(obj, map)
  }
}

function tick(obj: GameObject, map: GameMap) {
  switch (obj.type) {
    case "boss":
      boss_tick(obj, map)
    case "wall":
      break
  }
}

main();


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
