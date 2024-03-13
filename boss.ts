import { GameMap } from "./map";

type Stopped = { type: "stopped"; previous_direction: Direction | null };
type Moving = { type: "moving"; direction: Direction };
type Instructing = { type: "instructing" };
type BossState = Stopped | Moving | Instructing;

export interface Boss extends Vector, LiveObject {
    type: "boss";
    position: Vector
    state: BossState;
}

export function boss_tick(obj: Boss, map: GameMap) {
    switch (obj.state.type) {
        case "instructing":
            break
        case "moving":
            if (obj.state.direction) {
                const directions = map.forks(obj, "wall")
                moveBy(obj, obj.state.direction)
            }
            break
        case "stopped":
            break
    }
}
