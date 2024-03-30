import { Windows } from "@/ui"
import * as Logging from "@/utils/logging"
import * as Command from "./command"
import { Game, GameStorage, Renderer } from "./game"
import config from "./game/config"
import { Window } from "./help"

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
            Game.tick(game)
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
            case "s":
                save(this.game, this.storage)
                break
            case "l": {
                const loaded = load(this.storage)
                if (loaded != null) {
                    this.game = loaded
                }
                break
            }
            default: {
                const command = getCommand(event.key)
                if (command != null) {
                    this.game.commands.push(command)
                }
                break
            }
        }
    }
}

function help() {
    Windows.show(Windows.center(new Window()))
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
