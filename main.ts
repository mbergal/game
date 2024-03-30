import { Boss, Player } from "@/objects"
import _ from "lodash"
import { Game, GameStorage, Intro, Plan } from "./game"

import { Vector } from "./geometry"

import * as MazeGenerator from "./generator"

import { Windows } from "@/ui"
import * as Logging from "@/utils/logging"

import { GameWindow } from "./game_window"

const MAZE_SIZE: Vector.t = { y: 25, x: 80 }

const logger = Logging.make("main")

Logging.setIsEnabled((name: string) => _.includes(["main", "player", "game"], name))

export function main() {
    const boss: Boss.Boss = Boss.make()
    const plan: Plan.Plan = Plan.generatePlan(0)

    let game: Game.Game = Game.make(MAZE_SIZE, plan)
    MazeGenerator.maze(MAZE_SIZE, game)

    game.map.add([boss])

    game.player = Player.make(game.map.getRandomEmptyLocation())
    game.map.add([game.player])

    // let interval = window.setInterval(() => processTick(game), config.tickInterval)

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
