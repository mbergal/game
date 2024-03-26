import * as DayOfWeek from "./day_of_week"
import config from "./config"
export type t = {
    day: number
    ticks: number
    dayOfWeek: DayOfWeek.t
}

export function make(ticks: number): t {
    const day = Math.floor(ticks / config.dayTicks)
    const dayOfWeek = DayOfWeek.all[day % 7]
    return {
        ticks,
        day,
        dayOfWeek,
    }
}

export type GameTime = t
