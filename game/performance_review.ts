import { Effect, Effects, EngineeringLevels, Game } from "@/game"
import * as Plan from "./plan"

import * as Logging from "@/utils/logging"

import config from "./config"

const logger = Logging.make("performance_review")

export interface PerformanceReview {}
export function make(): PerformanceReview {
    return {}
}

export function generatePlan(startTick: number): Plan.Plan {
    const plan = Plan.make()
    // Plan.addEvent(plan, startTick + config.dayTicks * 14, { type: "performanceReview" })

    return plan
}

export function tick(game: Game.Game): Effects.Effects {
    const effects: Effects.Effects = []
    const newLevel = EngineeringLevels.level(game.score.impact)
    if (newLevel > game.player!.level) {
        game.player!.level = newLevel
        Effects.append(
            effects,
            Effect.showMessage(`You've been promoted Level up! ${game.player!.level}`, 3_000),
        )
    }
    game.player!.level = EngineeringLevels.level(game.score.impact)
    // processEvents(game, effects)
    return effects
}

function processEvents(game: Game.Game, effects: Effects.Effects) {
    const events = game.plan.get(game.time.ticks)

    if (events) {
        for (const event of events) {
            switch (event.type) {
                case "performanceReview":
                    logger("Performance review")
                    game.player!.level = EngineeringLevels.level(game.score.impact)
                    Effects.append(effects, Effect.showMessage("Performance review", 3_000))
            }
        }
    }
}
