import * as Game from "./game"
import * as Effect from "./effect"
import { Plan } from "./plan"
import * as random from "../utils/random"
import config from "./config"

export type Collapse = {}

export function make(): Collapse {
    return {}
}

export function plan(): Plan.t {
    const plan = Plan.make()
    Plan.addEvent(plan, (config.totalDays - 5) * config.dayTicks, { type: "collapseStart" })
    return plan
}
export function tick(game: Game.t): Effect.t[] {
    const events = game.plan.get(game.time.ticks)
    if (events && events.some((event) => event.type === "collapseStart")) {
        game.collapse = make()
    }
    if (game.collapse) {
        const walls = game.map.objects
            .filter((obj) => obj.type === "wall")
            .filter(
                (obj) =>
                    obj.position.y !== 0 &&
                    obj.position.y !== game.map.height - 1 &&
                    obj.position.x !== 0 &&
                    obj.position.x !== game.map.width - 1
            )
        const ticksLeft = config.totalDays * config.dayTicks - game.time.ticks
        const removeTicks = Math.floor(walls.length / ticksLeft) / 2
        const removeWalls = random.select(walls, removeTicks)
        game.map.remove(removeWalls)
    }
    return []
}
