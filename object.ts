import { Boss } from "./boss";
import { Wall } from "./wall";
export type GameObject = Wall | Boss;
export type GameObjectType = GameObject["type"]