import { GameMap } from "@/game"
import { Coffee, GameObject, Story } from "@/objects"

import { Direction, Vector, directionTo, moveTo } from "@/geometry"
import _ from "lodash"

export type Trait = { position: Vector.Vector | null; target: GameObject.GameObject | null }

export interface Pathway {
    make(position: Vector.Vector): GameObject.GameObject
    isPathlight(obj: GameObject.GameObject): obj is GameObject.GameObject
}

export function pickDirection(
    target: Trait,
    map: GameMap.GameMap,
    pathway: Pathway,
): Direction.t | null {
    if (target.target == null || target.position == null) {
        const targets = map.objects
            .filter((x) => Story.isStory(x) || Coffee.isCoffee(x))
            .filter((x) => x.position != null)

        const paths = targets.map((x) => ({
            target: x,
            path: findTarget(x, map, x.position!, target.position!),
        }))
        const path = _.minBy(paths, (x) => (x.path ? x.path.length : Infinity))
        target.target = path?.target ?? null
    }

    if (target.target == null) {
        return null
    }

    const pathToTarget = findTarget(target.target, map, target.position!, target.target.position!)

    map.remove(map.objects.filter(pathway.isPathlight))
    if (pathToTarget) {
        map.add(pathToTarget.map((x) => pathway.make(x)))
        return pathToTarget.length > 0 ? directionTo(target.position!, pathToTarget[1]) : null
    } else {
        return null
    }
}

function findTarget(
    obj: GameObject.GameObject,
    map: GameMap.GameMap,
    position: Vector.Vector,
    target: Vector.Vector,
): Vector.Vector[] | null {
    return bfs((v) => map.possibleDirections(v, (obj) => obj?.type != "wall"), position, target)
}

export function bfs(
    possibleMoves: (pos: Vector.Vector) => Direction.t[],
    start: Vector.Vector,
    target: Vector.Vector,
) {
    if (Vector.equals(start, target)) {
        return []
    }
    const queue: Array<Vector.Vector> = [start]
    const discovered = new Set<Vector.Repr>([Vector.repr(start)])

    const edges = new Map<Vector.Repr, number>()
    edges.set(Vector.repr(start), 0)

    const predecessors = new Map<Vector.Repr, Vector.Vector | null>()
    predecessors.set(Vector.repr(start), null)

    const buildPath = (
        goal: Vector.Vector,
        root: Vector.Vector,
        predecessors: Map<Vector.Repr, Vector.Vector | null>,
    ) => {
        const stack = [goal]

        let u = predecessors.get(Vector.repr(goal))!

        while (u != root) {
            stack.push(u)
            u = predecessors.get(Vector.repr(u))!
        }

        stack.push(root)

        let path = stack.reverse()

        return path
    }

    while (queue.length) {
        let v = queue.shift()!

        if (v.x === target.x && v.y === target.y) {
            return buildPath(target, start, predecessors)
        }

        for (const d of possibleMoves(v)) {
            {
                const nextPos = moveTo(v, d)
                if (!discovered.has(Vector.repr(nextPos))) {
                    discovered.add(Vector.repr(nextPos))
                    queue.push(nextPos)
                    edges.set(Vector.repr(nextPos), edges.get(Vector.repr(v))! + 1)
                    predecessors.set(Vector.repr(nextPos), v)
                }
            }
        }
    }

    return null
}
