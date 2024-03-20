import { Boss } from "./boss"
import { Footprint } from "./footprint"
import { Player } from "./player"
import { Wall } from "./wall"
import * as Door from "./door"
export * as Door from "./door"
import * as Story from "./story"
export * as Story from "./story"
import * as Commit from "./commit"
export * as Commit from "./commit"
import * as Coffee from "./coffee"
export * as Coffee from "./coffee"

export type GameObject =
    | Wall
    | Boss
    | Footprint
    | Player
    | Door.Door
    | Story.Story
    | Commit.t
    | Coffee.t

export type GameObjectType = GameObject["type"]
export type Item = Door.Door | Commit.Commit | Story.Story | Coffee.Coffee
