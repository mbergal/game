console.log("geometry/item.ts")

import * as Door from "./door"
import * as Commit from "./commit"
import * as Story from "./story"
import * as Coffee from "./coffee"
import * as GameObject from "./object"
import * as PrReview from "./pr_review"
import { assertUnreachable } from "@/utils"

export type Item = Door.Door | Commit.Commit | Story.Story | Coffee.Coffee | PrReview.PrReview

export function isItem(obj: GameObject.GameObject): obj is Item {
    switch (obj.type) {
        case "door":
        case "commit":
        case "story":
        case "coffee":
        case "pr_review":
            return true
        case "wall":
        case "boss":
        case "boss.footprint":
        case "developer.footprint":
        case "developer.pathlights":
        case "player":
        case "developer":
            return false
        default:
            assertUnreachable(obj)
    }
}

export function description(item: Item): string {
    switch (item.type) {
        case "door":
            return "door"
        case "commit":
            return `commit ${item.hash}`
        case "coffee":
            return `cup of coffee`
        case "story":
            return `story "${item.name}"`
        case "pr_review":
            return `Pull Request review`
    }
}
