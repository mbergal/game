import config from "@/game/config"
export interface SpeedUp<T> {
    speedUpDays(t: T): number
    setSpeedUp(t: T, ticks: number): void
    speedUp(t: T): number
}

export function speedUp<T>(speedUp: SpeedUp<T>, t: T) {
    const days = speedUp.speedUpDays(t)
    speedUp.setSpeedUp(t, speedUp.speedUp(t) + days * config.dayTicks)
}

export function tick<T>(speedUp: SpeedUp<T>, t: T, ticksPassed: number) {
    speedUp.setSpeedUp(t, Math.max(speedUp.speedUp(t) - ticksPassed))
}
