export type Person = {}

export function tryMove(
    position: Vector.Vector,
    direction: DirectionSetting.t,
    map: GameMap.GameMap,
): boolean {
    const obj = map.objAt(position, "wall")
    if (obj) {
        return false
    }
    return true
}
