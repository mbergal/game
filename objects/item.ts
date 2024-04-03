import * as Door from "./door"
import * as Commit from "./commit"
import * as Story from "./story"
import * as Coffee from "./coffee"
import * as GameObject from "./object"
import { assertUnreachable } from "@/utils/utils"

export type Item = Door.Door | Commit.Commit | Story.Story | Coffee.Coffee

export function isItem(obj: GameObject.GameObject): obj is Item {
    switch (obj.type) {
        case "door":
        case "commit":
        case "story":
        case "coffee":
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
    }
}
