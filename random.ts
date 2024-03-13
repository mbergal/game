import * as _ from "lodash";

export function getInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getInts(min: number, max: number, num_of_ints: number): number[] {
    return _.range(num_of_ints).map((i: number) => getInt(min, max))
}

