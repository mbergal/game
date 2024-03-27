import { Boss } from "./boss"
import { Footprint } from "./footprint"
import { Player } from "./player"
import { Wall } from "./wall"
import { Door } from "./door"
export { Door } from "./door"
import { Story } from "./story"
export { Story } from "./story"
import { Commit } from "./commit"
export { Commit } from "./commit"
import { Coffee } from "./coffee"
export { Coffee } from "./coffee"

export namespace GameObject {
    export type t = Wall | Boss | Footprint.t | Player | Door.t | Story.Story | Commit.t | Coffee.t

    export type GameObject = t
    export type GameObjectType = t["type"]
    export type Item = Door.t | Commit.t | Story.Story | Coffee.Coffee
}
