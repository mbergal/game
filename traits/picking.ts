import { Effect, Effects, GameMap } from "@/game"
import { Item } from "@/objects"
import * as Logging from "@/utils/logging"

const logger = Logging.make("picking")

export interface Picking<T> {
    canPickItem: (t: T, item: Item.Item) => boolean
    dropItem: (t: T, map: GameMap.GameMap, effects: Effects.Effects) => void
    pickItem: (t: T, item: Item.Item, map: GameMap.GameMap, effects: Effects.Effects) => void
}

export function make<T>(trait: Picking<T>) {
    return {
        pick(t: T, item: Item.Item, map: GameMap.GameMap, effects: Effects.Effects) {
            if (trait.canPickItem(t, item)) {
                logger(`Can pick item  ${JSON.stringify(t)}`)
                trait.pickItem(t, item, map, effects)
                Effects.append(
                    effects,
                    Effect.showMessage(`Picked ${Item.description(item)}`, 3_000),
                )
            }
        },
    }
}
