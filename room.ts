import { Vector } from "./geometry"

export type Room = {
    position: Vector
    length: number
    doors: Vector[]
}

export function upperDoors(room: Room) {
    return room.doors.filter(x => x.y < room.position.y).length
}

export function lowerDoors(room: Room) {
    return room.doors.filter(x => x.y > room.position.y).length
}
