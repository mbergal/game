import { GameObject } from "."
import { Vector } from "../geometry"

export interface Commit {
    type: "commit"
    position: Vector.t
    zIndex: number
    open: false
    hash: string
}

export function make(position: Vector.t): Commit {
    return {
        type: "commit",
        position: position,
        zIndex: 1,
        open: false,
        hash: generateId(8),
    }
}

export function isCommit(obj: GameObject.GameObject): obj is Commit {
    return obj.type === "commit"
}

function byteToHex(byte: any) {
    return ("0" + byte.toString(16)).slice(-2)
}

function generateId(len = 40) {
    var arr = new Uint8Array(len / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, byteToHex).join("")
}
