import { Vector } from "../geometry"

export interface t {
    type: "commit"
    position: Vector.t
    zIndex: number
    open: false
}

export interface Commit extends t {}

export function make(position: Vector.t): Commit {
    return {
        type: "commit",
        position: position,
        zIndex: 1,
        open: false,
    }
}
