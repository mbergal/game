import { Collapse, Event, PerformanceReview, Sprint } from "@/game"

import _ from "lodash"
import config from "./config"

export type Plan = Map<number, Event.t[]>

export function make() {
    return new Map<number, Event.t[]>()
}

export function addEvent(plan: Plan, time: number, event: Event.t) {
    if (!plan.has(time)) {
        plan.set(time, [])
    }
    plan.get(time)!.push(event)
}

export function getEvents(plan: Plan, time: number): Event.t[] {
    return plan.get(time) ?? []
}

export function append(plan: Plan, other: Plan): Plan {
    for (const time of other.keys()) {
        for (const event of other.get(time)!) {
            addEvent(plan, time, event)
        }
    }
    return plan
}

export function generatePlan(startDay: number): Plan {
    let plan = make()
    let startTick = startDay * config.dayTicks
    for (const i in _.range(Math.floor((config.totalDays - startDay) / 14))) {
        const r = Sprint.generatePlan(startTick)
        append(plan, r[0])
        startTick = r[1]
    }
    startTick = startDay * config.dayTicks
    for (const i in _.range(Math.floor((config.totalDays - startDay) / 14))) {
        const pplan = PerformanceReview.generatePlan(startTick)
        append(plan, pplan)
        startTick += config.dayTicks * 14
    }

    append(plan, Collapse.plan())
    return plan
}

export function daily(plan: Plan) {
    const result = [...plan.entries()].map(
        ([time, events]) => [Math.floor(time / config.dayTicks), events] as const,
    )
    return result.reduce((acc, [day, events]) => {
        acc.set(day, [...(acc.get(day) ?? []), ...events])
        return acc
    }, new Map<number, Event.t[]>())
}
