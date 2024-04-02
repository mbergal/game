import { Effects, GameMap } from "@/game"
import { Direction, Vector, moveBy } from "@/geometry"
import * as random from "@/utils/random"
import * as Item from "../item"
import * as FootprintTrait from "../traits/footprint"
import * as Traits from "../traits"
import * as Footprint from "./footprint"
export * as Footprint from "./footprint"

import config from "@/game/config"
import * as Logging from "@/utils/logging"
import { assertUnreachable } from "@/utils/utils"
import _ from "lodash"
import { Developer } from "../object"

const logger = Logging.make("fellow_developer")

export const type = "developer"
export type Developer = Traits.SpeedUp.SpeedUp & {
    type: typeof type
    position: Vector.Vector
    zIndex: number
    state: {
        tact: number
        direction: Direction.t | null
    }
}

export function make(position: Vector.Vector): Developer {
    return {
        type: type,
        position: position,
        state: {
            tact: 0,
            direction: null,
        },
        zIndex: 2,
        speedUp: false,
    }
}

function speedUp(developer: Developer) {
    Traits.SpeedUp.speedUp(developer, config.items.coffee.speedUpDays)
}

function pickDirection(
    position: Vector.Vector,
    currentDirection: Direction.t | null,
    map: GameMap.GameMap,
): Direction.t | null {
    const moves = possibleMoves(position, currentDirection, map)
    const moveIndexAndFootprint = (move: Direction.t, i: number) => {
        const footprint = map.objAt(moveBy(position, move), "developer.footprint")
        return footprint ? { moveIndex: i, footprint } : null
    }
    const footprints = _.compact(moves.map((move, i) => moveIndexAndFootprint(move, i)))

    const footprintWeights = _.chain(footprints)
        .map((f) => ({
            moveIndex: f.moveIndex,
            tact: f.footprint.tact,
        }))
        .sortBy(footprints, (x) => x.tact)
        .reverse()
        .map((x, i) => ({
            moveIndex: x.moveIndex,
            weight: config.developer.moves.weights.footprints[i],
        }))
        .keyBy((x) => x.moveIndex)
        .mapValues((x) => x.weight)
        .value()

    const moveWeights = moves
        .map((_) => 1)
        .map((weight, i) => (moves[i] == currentDirection ? weight + 3 : weight))
        .map((weight, i) => {
            return (
                weight +
                (map.objAt(moveBy(position, moves[i]), "developer.footprint") == null
                    ? config.developer.moves.weights.freeSpace
                    : 0)
            )
        })
        .map((weight, i) => {
            return weight + (footprintWeights[i] ?? 0)
        })
        .map((weight, i) =>
            currentDirection && moves[i] == Direction.reverse(currentDirection)
                ? config.developer.moves.weights.reverseDirection
                : weight,
        )

    if (moves.length > 0) {
        if (moves.length > 1) {
            logger(`moves:      ${moves}`)
            logger(`direction:  ${currentDirection}`)
            logger(`moveWeight: ${moveWeights}`)
        }
        // First, check if we can move forward
        const moveChoice = random.choice(moves, moveWeights)
        return moveChoice
    } else {
        return null
    }
}
export function tick(developer: Developer, map: GameMap.GameMap): Effects.Effects {
    const effects: Effects.Effects = []
    developer.state.tact += 1

    const moves = possibleMoves(developer.position, developer.state.direction, map)
    const moveIndexAndFootprint = (move: Direction.t, i: number) => {
        const footprint = map.objAt(moveBy(developer.position, move), "developer.footprint")
        return footprint ? { moveIndex: i, footprint } : null
    }
    const footprints = _.compact(moves.map((move, i) => moveIndexAndFootprint(move, i)))

    const footprintWeights = _.chain(footprints)
        .map((f) => ({
            moveIndex: f.moveIndex,
            tact: f.footprint.tact,
        }))
        .sortBy(footprints, (x) => x.tact)
        .reverse()
        .map((x, i) => ({
            moveIndex: x.moveIndex,
            weight: config.developer.moves.weights.footprints[i],
        }))
        .keyBy((x) => x.moveIndex)
        .mapValues((x) => x.weight)
        .value()

    const moveWeights = moves
        .map((_) => 1)
        .map((weight, i) => (moves[i] == developer.state.direction ? weight + 3 : weight))
        .map((weight, i) => {
            return (
                weight +
                (map.objAt(moveBy(developer.position, moves[i]), Developer.Footprint.type) == null
                    ? config.developer.moves.weights.freeSpace
                    : 0)
            )
        })
        .map((weight, i) => {
            return weight + (footprintWeights[i] ?? 0)
        })
        .map((weight, i) =>
            developer.state.direction && moves[i] == Direction.reverse(developer.state.direction)
                ? config.developer.moves.weights.reverseDirection
                : weight,
        )

    if (moves.length > 0) {
        if (moves.length > 1) {
            logger(`moves:      ${moves}`)
            logger(`direction:  ${developer.state.direction}`)
            logger(`moveWeight: ${moveWeights}`)
        }

        const moveChoice = pickDirection(developer.position, developer.state.direction, map)
        if (moveChoice != null) {
            developer.state.direction = moveChoice
            move(developer, moveBy(developer.position, moveChoice), moveChoice, map)
        }
    }

    return effects
}

export function possibleMoves(
    pos: Vector.t,
    currentDirection: Direction.t | null,
    map: GameMap.GameMap,
): Direction.t[] {
    const possible = map.possibleDirections(
        pos,
        (obj) => !obj || !["wall", "door"].includes(obj.type),
    )
    return possible
}

function canPickup(obj: Developer, item: Item.Item, map: GameMap.GameMap): boolean {
    switch (item.type) {
        case "coffee":
        case "commit":
            return true
        case "story":
        case "door":
            return false
        default:
            assertUnreachable(item)
    }
}

function pickupItem(obj: Developer, item: Item.Item, map: GameMap.GameMap) {
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
    obj.state = { direction: newDirection, tact: 0 }

    const item = _.first(map.at(newPos).filter(Item.isItem))
    if (item != null)
        if (canPickup(obj, item, map)) {
            pickupItem(obj, item, map)
        }

    FootprintTrait.leaveFootprint(obj.position, map, Footprint.make)
    map.move(obj, newPos)
}
