import * as _ from "lodash"
import { Vector, Direction, moveBy } from "../geometry"

import * as random from "../utils/random"
import { GameObject, GameObjectType } from "../objects/object"
import { check } from "../generator"

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

    add(objs: GameObject | GameObject[]) {
        const objs_ = objs instanceof Array ? objs : [objs]
        this.objects = this.objects.concat(objs_)
        for (const obj of objs_) {
            const objs = this.cells[obj.position.y][obj.position.x]
            objs.push(obj)
            this.cells[obj.position.y][obj.position.x] = _.chain(objs)
                .push(obj)
                .orderBy((x) => x.zIndex, "desc")
                .value()
        }
    }

    remove(objs: GameObject | GameObject[]) {
        const objs_ = objs instanceof Array ? objs : [objs]
        this.objects = this.objects.filter((x) => _.indexOf(objs_, x) == -1)
        for (const obj of objs_) {
            this.cells[obj.position.y][obj.position.x] = _.pull(
                this.cells[obj.position.y][obj.position.x],
                obj
            )
        }
    }

    move(obj: GameObject, pos: Vector.t) {
        this.remove([obj])
        obj.position = pos
        this.add([obj])
    }

    getRandomEmptyLocation(): Vector.t {
        const [x, y] = check(
            () => [random.getInt(0, this.width), random.getInt(0, this.height)],
            ([x, y]) => this.at({ x, y }).length == 0
        )

        return { x, y }
    }

    at(v: Vector.t): GameObject[] {
        return v.x >= 0 && v.y >= 0 && v.x < this.width && v.y < this.height
            ? this.cells[v.y][v.x]
            : []
    }

    atObj<T extends GameObject["type"]>(v: Vector.t, type: T): (GameObject & { type: T }) | null {
        const objs = this.at(v)
        const objOfType = objs.find((x) => x.type == type) ?? null
        return objOfType as (GameObject & { type: T }) | null
    }

    isAt(v: Vector.t, type: GameObject["type"]) {
        if (v.x < 0 || v.x >= this.width || v.y < 0 || v.y >= this.height) return false
        const objs: GameObject[] = this.cells[v.y][v.x]
        return objs != null ? _.some(objs, (x) => x.type == type) : false
    }

    possibleDirections(position: Vector.t, type: GameObjectType): Direction.t[] {
        const p: Direction.t[] = []
        for (const d of Direction.all) {
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

export function directionTo(
    position: Vector.t,
    map: GameMap,
    objType: GameObject["type"]
): Direction.t | null {
    const dd = _.compact(Direction.all.filter((x) => map.isAt(moveBy(position, x), objType)))
    return dd.length ? dd[0] : null
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
