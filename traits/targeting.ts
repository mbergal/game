import { GameObject } from "@/objects"

import { GameMap } from "@/game"
import { Vector } from "@/geometry"

export interface Targeting<T> {
    position(t: T): Vector.Vector | null
    target(t: T): GameObject.GameObject | null
    setTarget(t: T, target: GameObject.GameObject | null): void
    canMoveOn(position: Vector.Vector, map: GameMap.GameMap): boolean
}
