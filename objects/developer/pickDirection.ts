console.log("objects/developer/pickDirection.ts")

import { GameMap } from "@/game"
import config from "@/game/config"
import { Direction, Vector, moveTo } from "@/geometry"
import { Developer } from "@/objects"
import * as random from "@/utils/random"
import _ from "lodash"
import { logger, possibleMoves } from "."

export function pickDirection(
    position: Vector.Vector,
    currentDirection: Direction.t | null,
    map: GameMap.GameMap,
): Direction.t | null {
    const moves = possibleMoves(position, map)
    const moveIndexAndFootprint = (move: Direction.t, i: number) => {
        const footprint = map.objAt(moveTo(position, move), "developer.footprint")
        return footprint ? { moveIndex: i, footprint } : null
    }
    const footprints = _.compact(moves.map((move, i) => moveIndexAndFootprint(move, i)))

    const footprintWeights = _.chain(footprints)
        .map((f) => ({
            moveIndex: f.moveIndex,
            tick: f.footprint.tick,
        }))
        .sortBy(footprints, (x) => x.tick)
        .reverse()
        .map((x, i) => ({
            moveIndex: x.moveIndex,
            weight: config.developer.moves.weights.footprints[i],
        }))
        .keyBy((x) => x.moveIndex)
        .mapValues((x) => x.weight)
        .value()

    const moveWeightsConfig = config.developer.moves.weights
    const moveWeights = moves
        .map((_) => 1) // standard weight
        .map((weight, i) =>
            moves[i] == currentDirection ? weight + moveWeightsConfig.forwardDirection : weight,
        ) // prefer to keep moving in the same direction
        .map((weight, i) => {
            // prefer to move to a free space
            return (
                weight +
                (map.objAt(moveTo(position, moves[i]), Developer.Footprint.type) == null
                    ? moveWeightsConfig.freeSpace
                    : 0)
            )
        })
        .map((weight, i) => {
            return weight + (footprintWeights[i] ?? 0) // prefer to move to a place with older footprints
        })
        .map((weight, i) =>
            currentDirection && moves[i] == Direction.reverse(currentDirection)
                ? moveWeightsConfig.reverseDirection
                : weight,
        )

    if (moves.length > 0) {
        if (moves.length > 1) {
            logger(`moves:      ${_.zip(moves, moveWeights)}`)
            logger(`direction:  ${currentDirection}`)
        }
        // First, check if we can move forward
        const moveChoice = random.choice(moves, moveWeights)
        return moveChoice
    } else {
        return null
    }
}
