import { Coffee, Commit, GameObject, Story, Pathlight } from "@/objects"

import { GameMap } from "@/game"
import { Direction, Vector, directionTo, moveTo } from "@/geometry"
import _ from "lodash"

export interface Targeting<T> {
    position(t: T): Vector.Vector | null
    target(t: T): GameObject.GameObject | null
    setTarget(t: T, target: GameObject.GameObject | null): void
    canMoveOn(position: Vector.Vector, map: GameMap.GameMap): boolean
}

function isPresent<T>(input: null | undefined | T): input is T {
    return input != null
}

const findTargets = (objs: GameObject.GameObject[]) => {
    return objs
        .filter((x) => Story.isStory(x) || Coffee.isCoffee(x) || Commit.isCommit(x))
        .filter((x) => x.position != null)
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
            path: findPath(x, map, x.position!, startPosition, canMoveOn),
        }))
        .map((x) => (x.path != null ? { target: x.target, path: x.path } : null))
        .filter(isPresent)
}

export function pickDirection<T>(
    targeting: Targeting<T>, // modular explicit !!!
    t: T,
    map: GameMap.GameMap,
    pathway: Pathlight.Pathlight,
): Direction.t | null {
    let target = targeting.target(t)
    if (target == null || target.position == null) {
        const targets = findTargets(map.objects)
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
        target,
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
}

function findPath(
    obj: GameObject.GameObject,
    map: GameMap.GameMap,
    position: Vector.Vector,
    target: Vector.Vector,
    canMoveOn: (position: Vector.Vector, map: GameMap.GameMap) => boolean,
): Vector.Vector[] | null {
    return bfs((v) => map.possibleDirections(v, canMoveOn), position, target)
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
