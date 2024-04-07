import * as _ from "lodash"
import { assert } from "./assert"

let rng = Math.random

export function setRng(g: () => number) {
    rng = g
}

export function int(min: number, max: number): number {
    return Math.floor(rng() * (max - min)) + min
}

export function ints(min: number, max: number, num_of_ints: number): number[] {
    return _.range(num_of_ints).map((_: number) => int(min, max))
}

export function choice<T>(choices: T[], weights: number[] | null = null): T {
    assert(weights == null || choices.length == weights?.length)
    if (choices.length == 3) {
        // debugger
    }
    weights = weights ?? _.range(choices.length).map((_) => 1)
    let total = _.sum(weights)

    // Total in hand, we can now pick a random value akin to our
    // random index from before.
    const threshold = Math.random() * total

    total = 0
    for (let i = 0; i < choices.length - 1; ++i) {
        // Add the weight to our running total.
        total += weights[i]

        // If this value falls within the threshold, we're done!
        if (total >= threshold) {
            return choices[i]
        }
    }

    return choices[choices.length - 1]
}

export function select<T>(choices: T[], num: number): T[] {
    return _.sampleSize(choices, num)
}
