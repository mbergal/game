console.log("main.ts")
import _ from "lodash"
import { Game, Plan, GameStorage } from "./game"
import { Boss, Player, Developer } from "@/objects"
import { Vector } from "./geometry"
import { Windows } from "@/ui"
import { GameWindow } from "@/game_window"
import * as Intro from "@/help"

import * as Logging from "@/utils/logging"
import * as MazeGenerator from "@/generator"

const MAZE_SIZE: Vector.t = { y: 25, x: 80 }

const logger = Logging.make("main")

logger("Staring the game")

Logging.setIsEnabled((name: string) =>
    _.includes(["main", "player", "game", "fellow_developer"], name),
)

export function main() {
    const plan: Plan.Plan = Plan.generatePlan(0)
    const game: Game.Game = Game.make(MAZE_SIZE, plan)

    MazeGenerator.maze(MAZE_SIZE, game)

    const boss: Boss.Boss = Boss.make(
        game.map.getRandomLocation((map, position) => {
            const objs = map.at(position)
            return (
                objs.length > 0 &&
                objs.every(
                    (obj) =>
                        obj.type === "wall" &&
                        obj.position.y > 1 &&
                        obj.position.y < game.map.height - 1,
                )
            )
        }),
    )

    game.map.add([boss])

    game.player = Player.make(game.map.getRandomEmptyLocation())
    game.map.add([game.player])
    game.developer = Developer.make()
    game.map.add([game.developer])

    window.addEventListener("keydown", (event) => {
        const focused = Windows.focused()
        if (focused && focused.keydown) {
            focused.keydown(focused, event)
        }
    })

    Windows.show(new GameWindow(game, localStorage))
    Windows.show(Windows.center(new Intro.Window()))
}

const localStorage: GameStorage.GameStorage = {
    save(json: string): void {
        window.localStorage.setItem("map", json)
    },

    load(): string | null {
        const objectsStorage = window.localStorage.getItem("map")
        return objectsStorage
    },
}

main()
