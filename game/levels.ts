import _ from "lodash"

export type EngineeringLevel = {
    name: string
    rate: number
    impact: number
    oneTimeBonus: number
}

export const all: EngineeringLevel[] = [
    {
        name: "Engineer I",
        rate: 5,
        impact: 2,
        oneTimeBonus: 1000,
    },
    {
        name: "Engineer II",
        rate: 30,
        impact: 3,
        oneTimeBonus: 1000,
    },
    {
        name: "Engineer III",
        rate: 40,
        impact: 4,
        oneTimeBonus: 1000,
    },
    {
        name: "Senior Engineer I",
        rate: 50,
        impact: 5,
        oneTimeBonus: 5000,
    },
    {
        name: "Senior Engineer II",
        rate: 60,
        impact: 6,
        oneTimeBonus: 5000,
    },
    {
        name: "Engineering Lead",
        rate: 70,
        impact: 7,
        oneTimeBonus: 7000,
    },
    {
        name: "Staff Engineer I",
        rate: 80,
        impact: 8,
        oneTimeBonus: 7000,
    },
    {
        name: "Staff Engineer II",
        rate: 90,
        impact: 9,
        oneTimeBonus: 7000,
    },
    {
        name: "Principal Engineer",
        rate: 100,
        impact: 10,
        oneTimeBonus: 10000,
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
