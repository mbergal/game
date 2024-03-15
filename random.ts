import * as _ from "lodash"

export function getInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min
}

export function getInts(min: number, max: number, num_of_ints: number): number[] {
    return _.range(num_of_ints).map((i: number) => getInt(min, max))
}

export function choice<T>(choices: T[], weights: number[] | null = null): T {
    weights = weights ?? _.range(choices.length).map((x) => 1)
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
