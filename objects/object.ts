import * as Boss from "./boss"
import * as Player from "./player"
import * as Wall from "./wall"
import * as Door from "./door"
export * as Door from "./door"
import * as Story from "./story"
export * as Story from "./story"
import * as Commit from "./commit"
export * as Commit from "./commit"
import * as Coffee from "./coffee"
export * as Coffee from "./coffee"
import * as Developer from "./developer"
export * as Developer from "./developer"

export type t =
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

export type GameObject = t
export type Type = t["type"]

export type Item = Door.Door | Commit.Commit | Story.Story | Coffee.Coffee

export function isItem(obj: GameObject): obj is Item {
    return (
        obj.type === "door" ||
        obj.type === "commit" ||
        obj.type === "story" ||
        obj.type === "coffee"
    )
}
