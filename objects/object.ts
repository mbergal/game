import { Boss } from "./boss"
import { Footprint } from "./footprint"
import { Player } from "./player"
import { Wall } from "./wall"

export type GameObject = Wall | Boss | Footprint | Player
export type GameObjectType = GameObject["type"]
