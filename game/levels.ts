import _ from "lodash"

export type EngineeringLevel = {
    name: string
    rate: number
    impact: number
}

export const all: EngineeringLevel[] = [
    {
        name: "Engineer I",
        rate: 5,
        impact: 2,
    },
    {
        name: "Engineer II",
        rate: 30,
        impact: 3,
    },
    {
        name: "Engineer III",
        rate: 40,
        impact: 4,
    },
    {
        name: "Senior Engineer I",
        rate: 50,
        impact: 5,
    },
    {
        name: "Senior Engineer II",
        rate: 60,
        impact: 6,
    },
    {
        name: "Engineering Lead",
        rate: 70,
        impact: 7,
    },
    {
        name: "Staff Engineer I",
        rate: 80,
        impact: 8,
    },
    {
        name: "Staff Engineer II",
        rate: 90,
        impact: 9,
    },
    {
        name: "Principal Engineer",
        rate: 100,
        impact: 10,
    },
]

export function level(impact: number): EngineeringLevel {
    let total = 0
    for (const level of all) {
        total += level.impact
        if (total >= impact) {
            return level
        }
    }

    return _.last(all)!
}
