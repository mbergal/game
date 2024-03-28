import _ from "lodash"
import * as Effect from "./effect"

export type Effects = Array<Effect.Effect>

export function append(effects: Effects, other: Effect.Effect | Effects) {
    if (!_.isArray(other)) {
        other = [other]
    }
    for (const effect of other) {
        effects.push(effect)
    }
}
