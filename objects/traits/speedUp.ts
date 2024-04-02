import config from "@/game/config"
export type SpeedUp = {
    speedUp: false | number
}

export function speedUp(object: SpeedUp, days: number) {
    object.speedUp = (object.speedUp ? object.speedUp : 0) + days * config.dayTicks
}

export function tick(object: SpeedUp, ticksPassed: number) {
    if (object.speedUp) {
        object.speedUp -= ticksPassed
        if (object.speedUp <= 0) {
            object.speedUp = false
        }
    }
}
