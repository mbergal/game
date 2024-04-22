import { Coffee, Commit, GameObject, Story, Pathlight } from "@/objects"
import * as Traits from "@/traits"
import * as Utils from "@/utils"

import { GameMap } from "@/game"
import { Direction, Vector, directionTo, moveTo } from "@/geometry"
import _ from "lodash"

export function make<T>(targeting: Traits.Targeting.Targeting<T>) {
    return {
        pickDirection(
            t: T,
            map: GameMap.GameMap,
            pathway: Pathlight.Pathlight,
        ): Direction.t | null {
            let target = targeting.target(t)
            if (target == null || target.position == null) {
                const targets = targeting.findTargets(t, map)
                const targetPaths = findTargetPaths(
                    targets,
                    targeting.position(t)!,
                    map,
                    targeting.canMoveOn,
                )
                const path = _.minBy(targetPaths, (x) => (x.path ? x.path.length : Infinity))
                targeting.setTarget(t, path?.target ?? null)
            }

            target = targeting.target(t)
            if (target == null || target.position == null) {
                return null
            }

            const pathToTarget = findPath(
                map,
                targeting.position(t)!,
                target.position!,
                targeting.canMoveOn,
            )

            map.remove(map.objects.filter(pathway.isPathlight))
            if (pathToTarget != null) {
                if (pathToTarget) {
                    map.add(pathToTarget.map((x) => pathway.make(x)))
                    return pathToTarget.length > 0
                        ? directionTo(targeting.position(t)!, pathToTarget[1])
                        : null
                } else {
                    return null
                }
            } else {
                targeting.setTarget(t, null)
                return null
            }
        },
    }
}

function isPresent<T>(input: null | undefined | T): input is T {
    return input != null
}

const findTargetPaths = (
    targets: GameObject.GameObject[],
    startPosition: Vector.Vector,
    map: GameMap.GameMap,
    canMoveOn: (position: Vector.Vector, map: GameMap.GameMap) => boolean,
) => {
    return targets
        .map((x) => ({
            target: x,
            path: findPath(map, x.position!, startPosition, canMoveOn),
        }))
        .map((x) => (x.path != null ? { target: x.target, path: x.path } : null))
        .filter(isPresent)
}

function findPath(
    map: GameMap.GameMap,
    from: Vector.Vector,
    to: Vector.Vector,
    canMoveOn: (position: Vector.Vector, map: GameMap.GameMap) => boolean,
): Vector.Vector[] | null {
    return Utils.Bfs.bfs((v) => map.possibleDirections(v, canMoveOn), from, to)
}
