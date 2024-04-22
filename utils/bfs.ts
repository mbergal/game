import { Coffee, Commit, GameObject, Story, Pathlight } from "@/objects"
import * as Traits from "@/traits"

import { GameMap } from "@/game"
import { Direction, Vector, directionTo, moveTo } from "@/geometry"
import _ from "lodash"

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
