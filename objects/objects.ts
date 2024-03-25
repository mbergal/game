import _ from "lodash"
import * as GameObject from "./object"

export type t = GameObject.t[]

export function filter<
    T extends GameObject.GameObjectType,
    R extends (GameObject.t & { type: T })[]
>(objs: t, type: T): R {
    return _.filter(objs, (x) => x.type == type) as R
}
