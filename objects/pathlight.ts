import { GameObject } from "@/objects"
import { Vector } from "@/geometry"

export interface Pathlight {
    make(position: Vector.Vector): GameObject.GameObject
    isPathlight(obj: GameObject.GameObject): obj is GameObject.GameObject
}
