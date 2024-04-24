import { Collapse, Event, PerformanceReview, Sprint, Plan } from "@/game"
import { Logging } from "@/utils"
import _ from "lodash"
import config from "./config"

const logger = Logging.make("plan")

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

export function length(plan: Plan): number {
    return _.max([...plan.keys()]) ?? 0
}

export function offset(plan: Plan, offset: number): Plan {
    const newPlan = make()
    for (const [time, events] of plan.entries()) {
        for (const event of events) addEvent(newPlan, time + offset, event)
    }
    return newPlan
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
    let sprints = _.range(Math.floor((config.totalDays - startDay) / 14))
    for (const sprint of sprints) {
        const r = Sprint.generatePlan(
            sprint === _.last(sprints) ? { type: "last" } : { type: "normal" },
            startTick,
        )
        append(plan, r[0])
        startTick = r[1]
    }
    startTick = startDay * config.dayTicks
    for (const i in _.range(Math.floor((config.totalDays - startDay) / 14))) {
        const pplan = PerformanceReview.generatePlan(startTick)
        append(plan, pplan)
        startTick += config.dayTicks * 14
    }

    const collapsePlan = Collapse.plan()
    append(plan, Plan.offset(collapsePlan, startTick - Plan.length(collapsePlan)))
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

export function dump(plan: Plan) {
    const lines = []
    lines.push("Plan:")
    for (const [time, events] of _.sortBy([...plan.entries()], (x) => x[0])) {
        lines.push(`time: ${time}, day: ${time / config.dayTicks}`)
        for (const event of events) {
            lines.push(`  ${event.type}`)
        }
    }
    logger(lines.join("\n"))
    return lines.join("\n")
}
