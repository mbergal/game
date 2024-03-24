import _ from "lodash"
import * as Effect from "./effect"

export type t = Array<Effect.t>
export type Effects = t

export function append(effects: t, other: t | Effect.t) {
    if (!_.isArray(other)) {
        other = [other]
    }
    for (const effect of other) {
        effects.push(effect)
    }
}
