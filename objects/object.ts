import { Boss } from "./boss"
import { Footprint } from "./footprint"
import { Player } from "./player"
import { Wall } from "./wall"
import * as Item from "./item"

export type GameObject = Wall | Boss | Footprint | Player | Item.Item
export type GameObjectType = GameObject["type"]
