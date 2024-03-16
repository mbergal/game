import * as Direction from "../geometry/direction"
import { Command } from "../commands"
import { Vector } from "../geometry"
import { GameMap } from "../game/map"

export interface Player {
    type: "player"
    position: Vector.t
    direction: Direction.t | null
    zIndex: number
    tact: number
}

export function tick(obj: Player, map: GameMap) {}

export function command(obj: Player, command: Command, map: GameMap) {
    switch (command.type) {
        case "move":
            break
    }
}
