import { Boss, Footprint, GameObject, Player } from "@/objects"
import _ from "lodash"
import * as Command from "./command"
import {
    Collapse,
    Game,
    GameStorage,
    GameTime,
    ItemGenerator,
    PerformanceReview,
    Plan,
    Sprint,
    Renderer,
    Intro,
} from "./game"

import { Vector } from "./geometry"

import config from "./game/config"

import * as MazeGenerator from "./generator"

import { TextWindow, Windows } from "@/ui"
import * as Logging from "@/utils/logging"

import { assertUnreachable } from "./utils/utils"
import { GameWindow } from "./game_window"

const MAZE_SIZE: Vector.t = { y: 25, x: 80 }

export const logger = Logging.make("main")

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

export function processTick(game: Game.Game) {
    const fullTick = () => {
        Logging.setTime(game.time.ticks)
        game.score.stockPrice =
            100.0 - (100.0 / config.totalDays) * (game.time.ticks / config.dayTicks)
        game.score.money += game.player!.level.rate
        game.time = GameTime.make(game.time.ticks)

        Game.tick(game)
        Game.handleEffects(game, Collapse.tick(game))
        ItemGenerator.tick(game.itemGenerator, game)

        if (game.sprint) {
            Game.handleEffects(game, Sprint.tick(game.sprint, { ...game, player: game.player! }))
        }

        Game.handleEffects(game, PerformanceReview.tick(game))

        for (const obj of game.map.objects) {
            const result = tick(obj, game, game.commands, 1)
        }
        game.commands = []
        Renderer.render(game)
    }

    const playerTick = () => {
        Logging.setTime(game.time.ticks)
        game.score.stockPrice =
            100.0 - (100.0 / config.totalDays) * (game.time.ticks / config.dayTicks)
        game.score.money += game.player!.level.rate
        game.time = GameTime.make(game.time.ticks)
        const result = tick(game.player!, game, game.commands, 0.5)
        game.commands = []
        Renderer.render(game)
    }

    if (!game.player!.flags.spedUp) {
        fullTick()
        game.time.ticks += 1
    } else {
        playerTick()
        game.time.ticks += 0.5
        fullTick()
        game.time.ticks += 0.5
    }
}

function tick(
    obj: GameObject.t,
    game: Game.Game,
    commands: Command.Command[],
    ticksPassed: number
) {
    switch (obj.type) {
        case "boss":
            Boss.tick(obj, game.map)
            break
        case "footprint":
            Game.handleEffects(game, Footprint.tick(obj, game.map))
            break
        case "player":
            Game.handleEffects(game, Player.tick(obj, game, commands, ticksPassed))
            break
        case "door":
        case "story":
        case "commit":
        case "coffee":
        case "wall":
            break
        default:
            assertUnreachable(obj)
    }
}

main()
