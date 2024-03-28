import * as DayOfWeek from "./day_of_week"
import config from "./config"

export type GameTime = {
    day: number
    ticks: number
    dayOfWeek: DayOfWeek.DayOfWeek
}

export function make(ticks: number): GameTime {
    const day = Math.floor(ticks / config.dayTicks)
    const dayOfWeek = DayOfWeek.all[day % 7]
    return {
        ticks,
        day,
        dayOfWeek,
    }
}
