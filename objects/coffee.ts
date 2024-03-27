import { Vector } from "../geometry"

export namespace Coffee {
    export interface t {
        type: "coffee"
        position: Vector.t
        zIndex: number
        open: boolean
    }

    export interface Coffee extends t {}

    export function make(position: Vector.t): t {
        return {
            type: "coffee",
            position: position,
            zIndex: 1,
            open: false,
        }
    }
}
