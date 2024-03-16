import { Boss } from "./boss"
import { Footprint } from "./footprint"
import { Wall } from "./wall"
export type GameObject = Wall | Boss | Footprint
export type GameObjectType = GameObject["type"]
