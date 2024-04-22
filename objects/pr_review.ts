import { GameMap, Effects } from "@/game"
import { Developer } from "@/objects"
import { Vector, Direction, moveTo } from "@/geometry"
import { assertUnreachable } from "@/utils"

export interface PrReview {
    type: "pr_review"
    position: Vector.Vector | null
    zIndex: number
    open: boolean
    publishDirection: Direction.t | null
}

export function make(position: Vector.Vector): PrReview {
    return {
        type: "pr_review",
        position: position,
        zIndex: 2,
        open: false,
        publishDirection: null,
    }
}

export function publishTo(prReview: PrReview, direction: Direction.t): void {
    prReview.publishDirection = direction
}

export function tick(prReview: PrReview, map: GameMap.GameMap): Effects.Effects {
    if (prReview.publishDirection !== null && prReview.position !== null) {
        debugger
        const tryPosition = moveTo(prReview.position, prReview.publishDirection)
        const objs = map.at(prReview.position)
        const newObjs = map.at(tryPosition)
        for (const obj of newObjs) {
            switch (obj.type) {
                case "player":
                case "boss":
                case "wall":
                case "door":
                    debugger
                    map.remove(prReview)
                    return []
                case "story":
                case "pr_review":
                case "commit":
                case "developer.footprint":
                case "developer.pathlights":
                case "coffee":
                case "boss.footprint":
                    break
                case "developer":
                    Developer.defend(obj, prReview)
                    map.remove(prReview)
                    return []
                default:
                    assertUnreachable(obj)
            }
        }
        map.move(prReview, tryPosition)
    }
    return []
}
