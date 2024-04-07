import { Windows } from "@/ui"
import * as Logging from "@/utils/logging"
import * as Command from "../command"
import { Game, GameStorage, Renderer } from "../game"
import config from "../game/config"
import * as Help from "./help"
import * as EndGame from "./end_game"

const logger = Logging.make("game_window")

export class GameWindow extends Windows.Window {
    storage: GameStorage.GameStorage
    interval: number
    constructor(
        private game: Game.Game,
        storage: GameStorage.GameStorage,
    ) {
        super()
        this.storage = storage
        this.keydown = (window: Windows.Window, event: Windows.KeyboardEvent) => {
            this.processKey(event)
        }
        this.interval = this.setInterval(() => {
            const effect = Game.tick(this.game)
            switch (effect.type) {
                case "endGame":
                    this.clearInterval(this.interval)
                    endGame(effect)
                    break
                case "null":
                    break
            }
            Windows.updateScreen()
        }, config.tickInterval)
    }

    render() {
        return Renderer.render(this.game)
    }

    processKey(event: Windows.KeyboardEvent) {
        logger(`keydown: ${event.key}`)
        switch (event.key) {
            case "+":
                config.tickInterval -= 5
                this.clearInterval(this.interval)
                this.interval = this.setInterval(() => Game.tick(this.game), config.tickInterval)
                Game.message(this.game, {
                    text: `Speed increased to ${config.tickInterval}`,
                    ttl: 2,
                })
                break
            case "-":
                config.tickInterval += 5
                this.clearInterval(this.interval)
                this.interval = this.setInterval(() => Game.tick(this.game), config.tickInterval)
                Game.message(this.game, { text: "Speed decreased", ttl: 2 })
                break
            // case "]":
            //     game.score.level += 1
            //     break
            // case "[":
            //     game.score.level -= 1
            //     break
            case "?":
            case "h":
                help()
                break
            case "s":
                save(this.game, this.storage)
                break
            case "l": {
                const now = this.game.time.ticks
                const loaded = load(this.storage)
                if (loaded != null) {
                    this.game = loaded
                }
                break
            }
            default: {
                const command = getCommand(event.key)
                if (command != null) {
                    logger(`command: ${command.type}`)
                    this.game.commands.push(command)
                }
                break
            }
        }
    }
}

function help() {
    Windows.show(Windows.center(new Help.Window()))
}

function endGame(effect: Game.EndGameEffect) {
    Windows.show(Windows.center(new EndGame.Window(effect.message, effect.money, effect.level)))
}

function getCommand(key: string): Command.Command | null | undefined {
    switch (key) {
        case "ArrowUp":
            return { type: "move", direction: "up" }
        case "ArrowDown":
            return { type: "move", direction: "down" }
        case "ArrowLeft":
            return { type: "move", direction: "left" }
        case "ArrowRight":
            return { type: "move", direction: "right" }
        case "Enter":
            return { type: "use" }
        case "End":
        case "Delete":
            return { type: "stop" }
        case " ":
            return { type: "drop" }
    }
}

export function save(game: Game.Game, storage: GameStorage.GameStorage) {
    Game.save(game, storage)
    console.log("Game saved!")
}

export function load(storage: GameStorage.GameStorage): Game.Game | null {
    return Game.load(storage)
}
