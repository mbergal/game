import { GameMap } from "@/game"
import { Vector, Direction } from "@/geometry"
export type Person = {}

export function tryMove(
    position: Vector.Vector,
    direction: Direction.t,
    map: GameMap.GameMap,
): boolean {
    const obj = map.objAt(position, "wall")
    if (obj) {
        return false
    }
    return true
}
