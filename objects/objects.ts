console.log("objects/objects.ts")

import _ from "lodash"
import * as GameObject from "./object"

export type t = GameObject.GameObject[]

export function filter<T extends GameObject.Type, R extends (GameObject.t & { type: T })[]>(
    objs: t,
    type: T,
): R {
    return _.filter(objs, (x) => x.type == type) as R
}
