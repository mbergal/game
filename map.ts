import * as _ from "lodash"
import { Vector, AllDirections, moveBy } from "./geometry"
import * as Direction from "./direction"
import { GameObject, GameObjectType } from "./object"

export class GameMap {
    width: number
    height: number
    cells: GameObject[][][]
    objects: GameObject[]

    constructor(width: number, height: number, objs: GameObject[]) {
        this.width = width
        this.height = height
        const a = _.range(1, 21)
        this.cells = _.chunk(
            _.range(width * height).map((x) => []),
            width
        )
        this.objects = []
        this.add(objs)
    }

    add(objs: GameObject[]) {
        this.objects = this.objects.concat(objs)
        for (const obj of objs) {
            const objs = this.cells[obj.position.y][obj.position.x]
            objs.push(obj)
            this.cells[obj.position.y][obj.position.x] = _.chain(objs)
                .push(obj)
                .orderBy((x) => x.zIndex, "desc")
                .value()
        }
    }

    remove(objs: GameObject[]) {
        this.objects = this.objects.filter((x) => _.indexOf(objs, x) == -1)
        for (const obj of objs) {
            this.cells[obj.position.y][obj.position.x] = _.pull(
                this.cells[obj.position.y][obj.position.x],
                obj
            )
        }
    }

    move(obj: GameObject, pos: Vector) {
        this.remove([obj])
        obj.position = pos
        this.add([obj])
    }

    objs_at(v: Vector): GameObject[] {
        return this.cells[v.y][v.x]
    }

    isAt(v: Vector, type: GameObject["type"]) {
        if (v.x < 0 || v.x >= this.width || v.y < 0 || v.y >= this.height) return false
        const objs: GameObject[] = this.cells[v.y][v.x]
        return objs != null ? _.some(objs, (x) => x.type == type) : false
    }

    possibleDirections(position: Vector, type: GameObjectType): Direction.t[] {
        const p: Direction.t[] = []
        for (const d of AllDirections) {
            const newPos = moveBy(position, d)
            if (this.isAt(newPos, type)) p.push(d)
        }
        return p
    }

    toString(): string {
        let s = "\n"
        for (const y of _.range(this.height)) {
            for (const x of _.range(this.width)) s += repr(this.cells[y][x])
            s += "\n"
        }
        return s
    }

    toJson(): object {
        return {
            height: this.height,
            width: this.width,
            objects: this.objects,
        }
    }

    static fromJson(json: object) {}
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
