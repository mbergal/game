import { Coffee, Commit, GameObject, Item, Story } from "@/objects"
import * as Traits from "@/traits"

import { Effect, Effects, Event, Game, GameMap, Plan } from "@/game"
import { Direction, Vector, moveTo } from "@/geometry"
import * as PickDirection from "@/objects/pickDirection"
import * as Footprint from "./footprint"
export * as Footprint from "./footprint"
import * as Pathlight from "./pathlight"
export * as Pathlight from "./pathlight"

import config from "@/game/config"
import * as Logging from "@/utils/logging"
import * as Utils from "@/utils"
import { assertUnreachable, assert } from "@/utils"
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
    reviewingPr: boolean
}

export function isDeveloper(obj: GameObject.GameObject): obj is Developer {
    return obj.type === type
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
        return _.chain(map.objects)
            .filter((x) => Item.isItem(x))
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
                debugger
                return x
            })
            .sortBy((x) => (x[1] ? x[1].length : Infinity))
            .tap((x) => {
                debugger
                return x
            })
            .map((x) => x[0])
            .value()
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
        reviewingPr: false,
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
            case "workWeekStarted":
                game.map.move(developer, game.map.getRandomEmptyLocation())
                break
            case "workWeekEnded":
                game.map.move(developer, null)
                Effects.append(
                    effects,
                    Effect.showMessage("Developer: have a nice weekend!", 5_000),
                )
                break
        }
    }
}

const pickDirectionDeveloper = PickDirection.make(targeting)

export function tick(developer: Developer, game: Game.Game): Effects.Effects {
    const effects: Effects.Effects = []
    developer.tact += 1

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
    return map.at(position).every((obj) => !obj || !["wall", "door", "player"].includes(obj.type))
}

function canPickup(obj: Developer, item: Item.Item, map: GameMap.GameMap): boolean {
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
        if (canPickup(obj, item, map)) {
            pickupItem(obj, item, map)
        }

    if (obj.position != null) {
        footprint.leaveFootprint(obj.position, map, Footprint.make)
    }

    map.move(obj, newPos)
}

export function defend(obj: Developer, item: Item.Item) {
    switch (item.type) {
        case "coffee":
        case "door":
        case "commit":
        case "story":
            break
        case "pr_review":
            obj.reviewingPr = true
            break
        default:
            assertUnreachable(item)
    }
}
