import * as Event from "./event"

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
