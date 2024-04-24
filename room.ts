import { Vector, Direction } from "@/geometry"

export type Room = {
    position: Vector.Vector
    length: number
    doors: Vector.Vector[]
}

export function doors(room: Room, direction: Direction.Vertical) {
    switch (direction) {
        case "up":
            return room.doors.filter((x) => x.y < room.position.y)
        case "down":
            return room.doors.filter((x) => x.y > room.position.y)
    }
}

export function upperDoors(room: Room) {
    return room.doors.filter((x) => x.y < room.position.y).length
}

export function lowerDoors(room: Room) {
    return room.doors.filter((x) => x.y > room.position.y).length
}
