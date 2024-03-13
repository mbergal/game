import * as _ from "lodash"
import { Vector, Direction, AllDirections } from "./geometry"
import { GameObject, GameObjectType } from "./object"

export class GameMap {
    width: number
    height: number
    cells: GameObject[][][]
    objects: GameObject[]

    constructor(objs: GameObject[], width: number, height: number) {
        this.width = width
        this.height = height
        const a = _.range(1, 21)
        this.cells = _.chunk(_.range(width * height).map(x => []), width);
        this.objects = []
    }

    add(objs: GameObject[]) {
        this.objects = this.objects.concat(objs)
        for (const obj of objs) {
            const key = String([obj.position.x, obj.position.y])
            this.cells[obj.position.y][obj.position.x].push(obj)
        }
    }

    remove(objs: GameObject[]) {
        this.objects = this.objects.filter(x => _.indexOf(objs, x) == -1)
        for (const obj of objs) {
            this.cells[obj.position.y][obj.position.x] = _.pull(this.cells[obj.position.y][obj.position.x], obj)
        }
    }



    objs_at(v: Vector): GameObject[] {
        return this.cells[v.y][v.x]
    }

    is_at(v: Vector, type: GameObject["type"]) {
        const objs: GameObject[] = this.cells[v.y][v.x]
        return objs != null ? _.some(objs, x => x.type == type) : false
    }

    forks(position: Vector, type: GameObjectType): Partial<Record<Direction, Vector>> {
        const p: Partial<Record<Direction, Vector>> = {}
        for (const d of AllDirections) {
            p[d] = moveBy(position, d)
        }
        return p
    }

    to_string(): string {
        let s = "\n"
        for (const y of _.range(this.height)) {
            for (const x of _.range(this.width))
                s += repr(this.cells[y][x])
            s += "\n"
        }
        return s
    }
}

function repr(objs: GameObject[]) {
    if (objs.length > 0) {
        switch (objs[0].type) {
            case "wall":
                return "~"
            default:
                return "."
        }

    } else {
        return " "
    }
}