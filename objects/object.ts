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

export type GameObject = Wall | Boss | Footprint | Player | Door.Door | Story.Story | Commit.t

export type GameObjectType = GameObject["type"]
export type Item = Door.Door | Commit.t | Story.t
