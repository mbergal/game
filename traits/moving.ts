import { Vector } from "@/geometry"
import { GameMap } from "@/game"

export interface Moving {
    canMoveOn: (position: Vector.Vector, map: GameMap.GameMap) => boolean
    move: (position: Vector.Vector, map: GameMap.GameMap) => Vector.Vector
}
