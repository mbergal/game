import type * as Boss from "./boss"
import type * as Player from "./player"
import type * as Wall from "./wall"
import type * as Door from "./door"
import type * as Story from "./story"
import type * as Commit from "./commit"
import type * as Coffee from "./coffee"
import type * as Developer from "./developer"
import type * as PrReview from "./pr_review"

export type GameObject =
    | Wall.Wall
    | Boss.Boss
    | Boss.Footprint.Footprint
    | Player.Player
    | Door.Door
    | Story.Story
    | Commit.Commit
    | Coffee.Coffee
    | Developer.Developer
    | Developer.Footprint.Footprint
    | Developer.Pathlight.Pathlight
    | PrReview.PrReview

export type Type = GameObject["type"]

export type Item = Door.Door | Commit.Commit | Story.Story | Coffee.Coffee | PrReview.PrReview

export function isItem(obj: GameObject): obj is Item {
    return (
        obj.type === "door" ||
        obj.type === "commit" ||
        obj.type === "story" ||
        obj.type === "coffee" ||
        obj.type === "pr_review"
    )
}
