import { GameObject, Item } from "@/objects"
import * as Traits from "@/traits"

import { Effect, Effects, Event, Game, GameMap, Plan } from "@/game"
import { Direction, Vector, moveTo } from "@/geometry"
import * as PickDirection from "@/objects/pickDirection"
import * as Footprint from "./footprint"
import * as Pathlight from "./pathlight"
export * as Footprint from "./footprint"
export * as Pathlight from "./pathlight"

import config from "@/game/config"
import * as Utils from "@/utils"
import { assert, assertUnreachable } from "@/utils"
import * as Logging from "@/utils/logging"
import _ from "lodash"

export const logger = Logging.make("fellow_developer")

export const type = "developer"

export type Developer = {
    target: GameObject.GameObject | null
    type: typeof type
    position: Vector.Vector | null
    tact: number
    zIndex: number
    direction: Direction.t | null
    speedUp: number
    reviewingPr: number
    started: boolean
}

export function isDeveloper(obj: GameObject.GameObject): obj is Developer {
    return obj.type === type
}

export function plan(): Plan.Plan {
    const plan: Plan.Plan = Plan.make()
    Plan.addEvent(plan, 0, { type: "developerStarted" })

    return plan
}
export const targeting: Traits.Targeting.Targeting<Developer> = {
    position: (developer) => developer.position,
    target: (developer) => developer.target,
    setTarget: (developer, target) => {
        developer.target = target
    },
    canMoveOn,
    findTargets: (developer: Developer, map: GameMap.GameMap) => {
        const developerPosition = developer.position
        assert(developerPosition != null)
        return (
            _.chain(map.objects)
                .filter((x) => Item.isItem(x) && canPick(developer, x))
                .filter((x) => x.position != null)
                .map(
                    (x) =>
                        [
                            x,
                            Utils.Bfs.bfs(
                                (v) => map.possibleDirections(v, canMoveOn),
                                developerPosition,
                                x.position!,
                            ),
                        ] as const,
                )
                .tap((x) => {
                    if (x.length == 0) {
                        debugger
                    }
                    return x
                })
                .sortBy((x) => (x[1] ? x[1].length : Infinity))
                // .tap((x) => {
                //     debugger
                //     return x
                // })
                .map((x) => x[0])
                .value()
        )
    },
}

const footprint = Traits.Footprint.make(Footprint.footprint)

export const speedUp: Traits.SpeedUp.SpeedUp<Developer> = {
    speedUpDays: (t) => config.items.coffee.speedUpDays,
    setSpeedUp: (t, ticks) => {
        t.speedUp = ticks
    },
    speedUp: (t) => t.speedUp,
}

export function make(): Developer {
    return {
        type: type,
        position: null,
        tact: 0,
        direction: null,
        zIndex: 2,
        speedUp: 0,
        target: null,
        reviewingPr: 0,
        started: false,
    }
}

function processEvents(
    developer: Developer,
    events: Event.Event[],
    game: Game.Game,
    effects: Effects.Effects,
) {
    for (const event of events) {
        switch (event.type) {
            case "developerStarted":
                developer.started = true
                game.map.move(developer, game.map.getRandomEmptyLocation())
                Effects.append(
                    effects,
                    Effect.showMessage('Developer ("D"): So excited to work!', 5_000),
                )
                break
            case "workWeekStarted":
                if (developer.started) {
                    game.map.move(developer, game.map.getRandomEmptyLocation())
                }
                break
            case "workWeekEnded":
                if (developer.started) {
                    game.map.move(developer, null)
                    Effects.append(
                        effects,
                        Effect.showMessage("Developer: have a nice weekend!", 5_000),
                    )
                }
                break
        }
    }
}

const pickDirectionDeveloper = PickDirection.make(targeting)

export function tick(developer: Developer, game: Game.Game): Effects.Effects {
    const effects: Effects.Effects = []
    developer.tact += 1

    if (developer.reviewingPr) {
        developer.reviewingPr--
        if (developer.reviewingPr == 0) {
            Effects.append(
                effects,
                Effect.showMessage("Developer: Addressed you comments and merged!", 5_000),
            )
        }
    }

    const events = Plan.getEvents(game.plan, game.time.ticks)
    processEvents(developer, events, game, effects)

    Traits.SpeedUp.tick(speedUp, developer, 1)

    if (developer.tact % config.developer.moves.ticksPerMove != 0) {
        return effects
    }

    if (developer.reviewingPr) {
    } else if (developer.position != null) {
        const moveChoice = pickDirectionDeveloper.pickDirection(developer, game.map, Pathlight)
        if (moveChoice != null) {
            developer.direction = moveChoice
            move(developer, moveTo(developer.position, moveChoice), moveChoice, game.map)
        }
    }

    return effects
}

export function possibleMoves(pos: Vector.t, map: GameMap.GameMap): Direction.t[] {
    const possible = map.possibleDirections(pos, (position, map) =>
        map.at(position).every((obj) => !obj || !["wall", "door", "player"].includes(obj.type)),
    )
    return possible
}

export function canMoveOn(position: Vector.Vector, map: GameMap.GameMap): boolean {
    return map.at(position).every((obj) => !obj || !["wall", "door"].includes(obj.type))
}

function canPick(obj: Developer, item: Item.Item): boolean {
    switch (item.type) {
        case "coffee":
        case "commit":
        case "story":
        case "pr_review":
            return true
        case "door":
            return false
        default:
            assertUnreachable(item)
    }
}

function pickupItem(obj: Developer, item: Item.Item, map: GameMap.GameMap) {
    if (item === obj.target) {
        obj.target = null
    }
    map.remove(item)
    switch (item.type) {
        case "coffee":
            Traits.SpeedUp.speedUp(speedUp, obj)
            break
        case "commit":
        case "door":
        case "story":
        case "pr_review":
            break
        default:
            assertUnreachable(item)
    }
}

function move(obj: Developer, newPos: Vector.t, newDirection: Direction.t, map: GameMap.GameMap) {
    obj.direction = newDirection

    const item = _.first(map.at(newPos).filter(Item.isItem))
    if (item != null)
        if (canPick(obj, item)) {
            pickupItem(obj, item, map)
        }

    if (obj.position != null) {
        footprint.leaveFootprint(obj.position, map, Footprint.make)
    }

    map.move(obj, newPos)
}

export function defend(obj: Developer, item: Item.Item, effects: Effects.Effects) {
    switch (item.type) {
        case "coffee":
        case "door":
        case "commit":
        case "story":
            break
        case "pr_review":
            obj.reviewingPr = config.developer.prReview.days * config.dayTicks
            Effects.append(
                effects,
                Effect.showMessage(
                    "Developer is stunned by you feedback and is working on addressing it !",
                    5_000,
                ),
            )
            break
        default:
            assertUnreachable(item)
    }
}
