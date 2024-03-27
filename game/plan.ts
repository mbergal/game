import * as Event from "./event"
import * as Sprint from "./sprint"
import * as Collapse from "./collapse"

import config from "./config"
import _ from "lodash"

export namespace Plan {
    export type t = Map<number, Event.t[]>

    export function make() {
        return new Map<number, Event.t[]>()
    }

    export function addEvent(plan: t, time: number, event: Event.t) {
        if (!plan.has(time)) {
            plan.set(time, [])
        }
        plan.get(time)!.push(event)
    }

    export function append(plan: t, other: t): t {
        for (const time of other.keys()) {
            for (const event of other.get(time)!) {
                addEvent(plan, time, event)
            }
        }
        return plan
    }

    export function generatePlan(startDay: number): t {
        let plan = make()
        let startTick = startDay * config.dayTicks
        for (const i in _.range(Math.floor((config.totalDays - startDay) / 14))) {
            const r = Sprint.generateSprint(startTick)
            append(plan, r[0])
            startTick = r[1]
        }

        append(plan, Collapse.plan())
        return plan
    }
}
