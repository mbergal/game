import { Plan } from "./plan"
export interface PerformanceReview {}
export function make(): PerformanceReview {
    return {}
}

export function generatePlan(): Plan.t {
    return Plan.make()
}

export function tick() {}
