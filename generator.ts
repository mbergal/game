import _ from "lodash";
import { Vector, n, s } from "./geometry";
import { GameMap } from "./map";
import * as random from "./random";
import * as Room from "./room";

export function check<T>(t: () => T, f: (t: T) => boolean) {
    while (true) {
        const tt = t()
        if (f(tt)) return tt
    }
}

export function generateRoomWalls(args: {
    width: number,
    height: number,
    wallsPerRow: { min: number, max: number }
}): Vector[] {
    const room_walls = _.flatMap(
        _.range(3, args.height - 2, 2).map((y: number) =>
            _.flatMap(check(
                () => random.getInts(
                    0,
                    args.width,
                    random.getInt(args.wallsPerRow.min, args.wallsPerRow.max)),
                x => proper_distance(x.concat([0, args.width]))).map(x => vline({ x, y }, 1))
            )
        ));
    return room_walls
}


export function generateRoomDoors(map: GameMap): void {
    for (let row = 3; row <= map.height - 2; row += 2) {
        const rooms = getRowRooms(map, row)
        makeRoomDoors(map, rooms)

        const doors = _.map(rooms, x => x.doors).flatMap(x => x)
        for (const door of doors) {
            const objs = map.objs_at(door)
            map.remove(objs)
        }
    }
}

function desiredNumOfDoors(room: Room.Room) {
    const a: [number, number, number][] = [
        [3, 0, 1],
        [6, 1, 2],
        [100, 2, 5]
    ]
    const min_max = _.find(a, x => x[0] > room.length)

    return random.getInt(min_max[1], min_max[2])
}


function noWalls(map: GameMap, xs: number[], y: number): boolean {
    for (const x of xs) {
        if (map.isAt({ x, y: y - 1 }, "wall") || map.isAt({ x, y: y + 1 }, "wall")) {
            return false
        }
    }
    return true
}

function makeRoomDoors(map: GameMap, rooms: Room.Room[]) {
    for (const room of rooms) {
        const num_of_upper = desiredNumOfDoors(room) / 2 - Room.upperDoors(room)
        const num_of_lower = desiredNumOfDoors(room) / 2 - Room.lowerDoors(room)

        const xx = check(
            () => random.getInts(room.position.x, room.position.x + room.length, num_of_lower),
            t => proper_distance(t) && noWalls(map, t, room.position.y - 1)
        )

        room.doors = room.doors.concat(xx.map(x => ({ x, y: room.position.y - 1 })))
        // make hole
    }
    return rooms
}

function getRowRooms(map: GameMap, row: number): Room.Room[] {
    const rooms = []
    let currentRoom: Room = {
        position: { x: 0, y: 0 },
        length: 0,
        doors: []
    }
    for (let x = 0; x < map.width; x++) {
        const c = { x: x, y: row }
        if (map.objs_at(n(c)).length == 0) {
            currentRoom.doors.push(n(c))
        }
        if (map.objs_at(s(c)).length == 0) {
            currentRoom.doors.push(s(c))
        }
        if (map.objs_at({ x: x, y: row }).length > 0) {
            if (currentRoom.length > 0)
                rooms.push(currentRoom)

            currentRoom = {
                position: { x: x, y: row },
                length: 1,
                doors: []
            }
        } else {
            currentRoom.length += 1
        }
    }
    return rooms
}


type Nullable<T> = T | undefined | null

function proper_distance(walls: number[]): boolean {
    const notEmpty = (value: [Nullable<number>, Nullable<number>]): value is [number, number] => value[0] !== null && value[1] != null;

    const sorted_walls = _.sortBy(walls)
    const distances = _.chain(
        _.zip(sorted_walls, sorted_walls.slice(1)))
        .initial()
        .value()
        .filter(notEmpty)



    const result = _.every(distances.map(x => x[1] - x[0]), x => x > 2)
    return result
}

function line(start: Vector, direction: Vector, size: number): Vector[] {
    const line_vector = [];
    for (let i = 0; i < size; ++i) {
        line_vector.push({
            x: start.x + i * direction.x,
            y: start.y + i * direction.y,
        });
    }
    return line_vector;
}

export function hline(start: Vector, size: number): Vector[] {
    return line(start, { x: 1, y: 0 }, size);
}

export function vline(start: Vector, size: number): Vector[] {
    return line(start, { x: 0, y: 1 }, size);
}
