import { Effect, Effects, Event, Game, GameMap, Plan } from "@/game"
import { Direction, Vector, moveTo } from "@/geometry"
import * as Item from "../item"
import * as Traits from "../traits"
import * as FootprintTrait from "../traits/footprint"
import * as Footprint from "./footprint"
import * as Pathlights from "./pathlights"
export * as Footprint from "./footprint"
export * as Pathlights from "./pathlights"

import config from "@/game/config"
import * as Logging from "@/utils/logging"
import { assertUnreachable } from "@/utils/utils"
import _ from "lodash"

export const logger = Logging.make("fellow_developer")

export const type = "developer"

export type Developer = Traits.SpeedUp.SpeedUp &
    Traits.Targeting.Trait & {
        type: typeof type
        position: Vector.Vector | null
        tact: number
        zIndex: number
        direction: Direction.t | null
    }

export function make(): Developer {
    return {
        type: type,
        position: null,
        tact: 0,
        direction: null,
        zIndex: 2,
        speedUp: false,
        target: null,
    }
}

function speedUp(developer: Developer) {
    Traits.SpeedUp.speedUp(developer, config.items.coffee.speedUpDays)
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
                Effects.append(effects, Effect.showMessage("Developer: have a nice weekend!", 1000))
                break
        }
    }
}
export function tick(developer: Developer, game: Game.Game): Effects.Effects {
    const effects: Effects.Effects = []
    developer.tact += 1

    const events = Plan.getEvents(game.plan, game.time.ticks)
    processEvents(developer, events, game, effects)

    Traits.SpeedUp.tick(developer, 1)

    if (developer.tact % config.developer.moves.ticksPerMove != 0) {
        return effects
    }

    if (developer.position != null) {
        const moveChoice = Traits.Targeting.pickDirection(developer, game.map, {
            isPathlight: Pathlights.isPathlights,
            make: Pathlights.make,
        })
        // const moveChoice = pickDirection(developer.position, developer.direction, game.map)
        if (moveChoice != null) {
            developer.direction = moveChoice
            move(developer, moveTo(developer.position, moveChoice), moveChoice, game.map)
        }
    }

    return effects
}

export function possibleMoves(pos: Vector.t, map: GameMap.GameMap): Direction.t[] {
    const possible = map.possibleDirections(
        pos,
        (obj) => !obj || !["wall", "door", "player"].includes(obj.type),
    )
    return possible
}

function canPickup(obj: Developer, item: Item.Item, map: GameMap.GameMap): boolean {
    switch (item.type) {
        case "coffee":
        case "commit":
        case "story":
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
            speedUp(obj)
            break
        case "commit":
        case "door":
        case "story":
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
        FootprintTrait.leaveFootprint(obj.position, map, Footprint.make)
    }

    map.move(obj, newPos)
}
