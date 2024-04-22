import { GameObject } from "@/objects"

import { GameMap } from "@/game"
import { Vector } from "@/geometry"

export type Target = GameObject.GameObject
export interface Targeting<T> {
    position(t: T): Vector.Vector | null
    target(t: T): Target | null
    setTarget(t: T, target: Target | null): void
    findTargets(t: T, map: GameMap.GameMap): Target[]
    canMoveOn(position: Vector.Vector, map: GameMap.GameMap): boolean
}
