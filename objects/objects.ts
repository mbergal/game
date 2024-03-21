import _ from "lodash"
import { GameObject, GameObjectType } from "./object"

export type t = GameObject[]

export function filter<T extends GameObjectType, R extends (GameObject & { type: T })[]>(
    objs: t,
    type: T
): R {
    return _.filter(objs, (x) => x.type == type) as R
}
