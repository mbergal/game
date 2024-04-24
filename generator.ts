import { Game, GameMap, Renderer } from "@/game"
import config from "@/game/config"
import { GameObject } from "@/objects"
import { check, ensure } from "@/utils/generators"
import { Random, Logging } from "@/utils"
import _, { map } from "lodash"
import { Direction, Vector, hline, moveTo, vline } from "./geometry"
import * as Room from "./room"

const logger = Logging.make("generator")

type Nullable<T> = T | undefined | null

export function maze(size: Vector.t, game: Game.Game) {
    const outer_walls = hline({ x: 0, y: 0 }, size.x)
        .concat(vline({ x: 0, y: 0 }, size.y))
        .concat(vline({ x: size.x - 1, y: 0 }, size.y))
        .map(
            (point: Vector.t): GameObject.GameObject => ({
                position: point,
                type: "wall",
                zIndex: 0,
            }),
        )

    game.map.add(outer_walls)

    const inner_walls = _.range(0, size.y, 2)
        .map((y: number) => hline({ x: 0, y }, size.x))
        .flatMap((x) => x)
        .map(
            (point: Vector.t): GameObject.GameObject => ({
                type: "wall",
                position: point,
                zIndex: 0,
            }),
        )

    game.map.add(inner_walls)

    const room_walls = roomWalls({
        height: size.y,
        width: size.x,
        wallsPerRow: { min: 3, max: 7 },
    }).map(
        (point: Vector.t): GameObject.GameObject => ({
            type: "wall",
            position: point,
            zIndex: 0,
        }),
    )

    game.map.add(room_walls)

    generateRoomDoors(game.map)
}

export function roomWalls(args: {
    width: number
    height: number
    wallsPerRow: { min: number; max: number }
}): Vector.t[] {
    const room_walls = _.flatMap(
        _.range(3, args.height - 2, 2).map((y: number) =>
            _.flatMap(
                ensure(
                    () =>
                        Random.ints(
                            0,
                            args.width,
                            Random.int(args.wallsPerRow.min, args.wallsPerRow.max),
                        ),
                    (x) => properlyDistanced(3, x.concat([0, args.width])),
                    20,
                ).map((x) => vline({ x, y }, 1)),
            ),
        ),
    )
    return room_walls
}

export function generateRoomDoors(map: GameMap.GameMap): void {
    const roomRows = _.range(3, map.height - 3, 2)
    for (let row of roomRows) {
        const rooms = getRowRooms(map, row)
        makeRoomDoors(map, rooms, "up")

        let doors = rooms.map((x) => x.doors).flatMap((x) => x)
        for (const door of doors) {
            const objs = map.at(door)
            map.remove(objs)
        }

        makeRoomDoors(map, rooms, "down")
        doors = rooms.map((x) => x.doors).flatMap((x) => x)
        for (const door of doors) {
            const objs = map.at(door)
            map.remove(objs)
        }
    }
}

/**
 * Check if there are no walls above or below the room
 *  */
function noWalls(map: GameMap.GameMap, xs: number[], y: number, direction: "up" | "down"): boolean {
    for (const x of xs) {
        if (
            map.someObjectsAt({ x, y: y - 1 }, "wall") ||
            map.someObjectsAt({ x, y: y + 1 }, "wall")
        ) {
            return false
        }
    }
    return true
}

;(window as any).dev = { renderRoom: renderRoom }

export function renderRoom(room: Room.Room, map: GameMap.GameMap) {
    const renderedRoom = Renderer.renderMapRect(map, 0, {
        position: { x: room.position.x, y: room.position.y - 2 },
        size: { x: room.length + 2, y: 5 },
    })
    return console.log(renderedRoom.join("\n"))
}

/**
 * Returns whether the doors are properly spaced and there are no walls above or below the room.
 * @param map
 * @param room
 * @param wallPositions proposed wall positions
 * @param direction direction of wall placement in the room
 * @returns true if the doors are properly spaced and there are no walls above or below the room, false otherwise
 */
function areDoorsProperlySpaced(
    map: GameMap.GameMap,
    room: Room.Room,
    wallPositions: number[],
    direction: "up" | "down",
) {
    return (
        properlyDistanced(
            doorSpacing(room.length),
            Room.doors(room, direction)
                .map((existingWallPosition) => existingWallPosition.x)
                .concat(wallPositions),
        ) && noWalls(map, wallPositions, moveTo(room.position, direction).y, direction)
    )
}

/**
 * Adds doors to the rooms in the direction `direction`
 */
function makeRoomDoors(map: GameMap.GameMap, rooms: Room.Room[], direction: Direction.Vertical) {
    const placeDoorsInRoom = (room: Room.Room, numOfDoors: number) => {
        const wallPositions = check(
            () => Random.ints(room.position.x, room.position.x + room.length, numOfDoors),
            (wallPositions) => areDoorsProperlySpaced(map, room, wallPositions, direction),
        )

        if (wallPositions != null) {
            room.doors = room.doors.concat(
                wallPositions.map((x) => ({
                    x,
                    y: room.position.y - (direction === "up" ? 1 : -1),
                })),
            )
        } else {
            const renderedRoom = Renderer.renderMapRect(map, 0, {
                position: { x: room.position.x, y: room.position.y - 2 },
                size: { x: room.length + 2, y: 5 },
            })
            console.log(
                `Failed to add ${numOfDoors} ${direction} door(s) in room ${JSON.stringify(room)}`,
            )
            console.log(renderedRoom.join("\n"))
            debugger
        }
        return wallPositions
    }

    for (const room of rooms) {
        const numOfExistingDoors = direction == "up" ? Room.upperDoors(room) : Room.lowerDoors(room)
        let numOfDoors = Math.floor(desiredNumOfDoors(room) / 2 - numOfExistingDoors)

        while (numOfDoors >= 0) {
            const success = placeDoorsInRoom(room, numOfDoors)
            if (success) break
            numOfDoors--
        }
    }
    return rooms
}

/**
 *  Returns an array of rooms in the given row.
 */
function getRowRooms(map: GameMap.GameMap, row: number): Room.Room[] {
    const rooms = []
    let currentRoom: Room.Room = {
        position: { x: 0, y: 0 },
        length: 0,
        doors: [],
    }
    for (let x = 0; x < map.width; x++) {
        const c = { x: x, y: row }
        if (map.at(Vector.n(c)).length == 0) {
            currentRoom.doors.push(Vector.n(c))
        }
        if (map.at(Vector.s(c)).length == 0) {
            currentRoom.doors.push(Vector.s(c))
        }
        if (map.at({ x: x, y: row }).length > 0) {
            if (currentRoom.length > 0) rooms.push(currentRoom)

            currentRoom = {
                position: { x: x, y: row },
                length: 1,
                doors: [],
            }
        } else {
            currentRoom.length += 1
        }
    }
    return rooms
}

/**
 * Returns the spacing between doors based on the length of the room.
 */
function doorSpacing(roomLength: number): number {
    return roomLength < 5 ? 2 : roomLength < 10 ? 3 : roomLength < 15 ? 4 : roomLength < 25 ? 5 : 5
}

/**
 * Returns the desired number of doors based on the length of the room.
 */
function desiredNumOfDoors(room: Room.Room) {
    const min_max = _.find(config.maze.numberOfDoorsPerRoom, (x) => x[0] > room.length)!

    return Random.int(min_max[1], min_max[2])
}

/**
 * Checks if the given array of walls has proper interwall distance.
 *
 * @param walls - An array of numbers representing the positions of walls.
 * @returns A boolean indicating whether the walls have proper interwall distance.
 */

function properlyDistanced(minimalSpacing: number, walls: number[]): boolean {
    const notEmpty = (value: [Nullable<number>, Nullable<number>]): value is [number, number] =>
        value[0] !== null && value[1] != null

    const sorted_walls = _.sortBy(walls)
    const distances = _.chain(_.zip(sorted_walls, sorted_walls.slice(1)))
        .initial()
        .value()
        .filter(notEmpty)

    const result = _.every(
        distances.map((x) => x[1] - x[0]),
        (x) => x >= minimalSpacing,
    )
    if (result === false) {
        logger("properlyDistanced " + JSON.stringify({ minimalSpacing, walls, distances, result }))
    }

    return result
}
