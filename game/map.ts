import { Direction, Vector, moveTo } from "@/geometry"
import * as _ from "lodash"

import { check } from "@/utils/generators"
import { GameObject } from "@/objects"
import * as random from "@/utils/random"
import { assert } from "@/utils/assert"

export class GameMap {
    width: number
    height: number
    cells: GameObject.GameObject[][][]
    /**
     * List of objects in the game including ones that don't have a position
     */
    objects: GameObject.GameObject[]

    constructor(width: number, height: number, objs: GameObject.GameObject[]) {
        this.width = width
        this.height = height
        const a = _.range(1, 21)
        this.cells = _.chunk(
            _.range(width * height).map((x) => []),
            width,
        )
        this.objects = []
        this.add(objs)
    }

    /**
     * Add objects to the map
     * * If the object has a position, it will be added to the map cells
     * * If the object doesn't have a position, it will be added to the list of objects
     *
     * @param objs - Object or list of objects to add to the map
1     */
    add(objs: GameObject.GameObject | GameObject.GameObject[]): void {
        const objs_ = objs instanceof Array ? objs : [objs]
        this.objects = this.objects.concat(objs_)
        for (const obj of objs_) {
            if (obj.position != null) {
                const objs = this.cells[obj.position.y][obj.position.x]
                if (objs == null) {
                    debugger
                }
                objs.push(obj)
                this.cells[obj.position.y][obj.position.x] = _.chain(objs)
                    .push(obj)
                    .orderBy((x) => x.zIndex, "desc")
                    .value()
            }
        }
    }

    /**
     * Remove objects from the map
     * * If the object has a position, it will be removed from the map cells
     */
    remove(objs: GameObject.GameObject | readonly GameObject.GameObject[]) {
        const objs_ = objs instanceof Array ? objs : [objs]
        this.objects = this.objects.filter((x) => _.indexOf(objs_, x) == -1)
        for (const obj of objs_) {
            if (obj.position) {
                this.cells[obj.position.y][obj.position.x] = _.pull(
                    this.cells[obj.position.y][obj.position.x],
                    obj,
                )
            }
            obj.position = null
        }
    }

    move(obj: GameObject.GameObject, pos: Vector.t | null) {
        this.remove([obj])
        obj.position = pos
        this.add([obj])
    }

    getRandomLocation(f: (map: GameMap, position: Vector.Vector) => boolean): Vector.t {
        const location = check(
            () => [random.int(0, this.width), random.int(0, this.height)],
            ([x, y]) => f(this, { x, y }),
        )
        assert(location != null)
        const [x, y] = location

        return { x, y }
    }

    getRandomEmptyLocation(): Vector.t {
        return this.getRandomLocation(Predicates.empty)
    }

    at(v: Vector.t): readonly GameObject.GameObject[] {
        return v.x >= 0 && v.y >= 0 && v.x < this.width && v.y < this.height
            ? this.cells[v.y][v.x]
            : []
    }

    objAt<T extends GameObject.GameObject["type"]>(
        v: Vector.t,
        type: T,
    ): (GameObject.GameObject & { type: T }) | null {
        const objs = this.at(v)
        const objOfType = objs.find((x) => x.type == type) ?? null
        return objOfType as (GameObject.GameObject & { type: T }) | null
    }

    someObjectsAt(
        v: Vector.t,
        include: GameObject.Type | ((obj: GameObject.GameObject | null) => boolean),
    ): boolean {
        if (v.x < 0 || v.x >= this.width || v.y < 0 || v.y >= this.height) return false
        const objs: GameObject.GameObject[] = this.cells[v.y][v.x]
        return objs.length > 0
            ? _.some(objs, (x) => (include instanceof Function ? include(x) : include == x.type))
            : include instanceof Function
              ? include(null)
              : false
    }

    everyObjectAt(
        v: Vector.t,
        include: GameObject.Type | ((obj: GameObject.GameObject | null) => boolean),
    ): boolean {
        if (v.x < 0 || v.x >= this.width || v.y < 0 || v.y >= this.height) return false
        const objs: GameObject.GameObject[] = this.cells[v.y][v.x]
        return objs.length > 0
            ? _.every(objs, (x) => (include instanceof Function ? include(x) : include == x.type))
            : include instanceof Function
              ? include(null)
              : false
    }

    // possibleDirections(
    //     position: Vector.t,
    //     check: GameObject.Type | ((obj: GameObject.t | null) => boolean),
    // ): Direction.t[] {
    //     const p: Direction.t[] = []
    //     for (const d of Direction.all) {
    //         const newPos = moveTo(position, d)
    //         if (this.everyObjectAt(newPos, check)) p.push(d)
    //     }
    //     return p
    // }

    possibleDirections(
        position: Vector.t,
        canMoveOn: (position: Vector.Vector, map: GameMap) => boolean,
    ): Direction.t[] {
        const p: Direction.t[] = []
        for (const d of Direction.all) {
            const newPos = moveTo(position, d)
            if (canMoveOn(newPos, this)) p.push(d)
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

    static fromJson(json: object): GameMap {
        const { width, height, objects } = json as any
        return new GameMap(width, height, objects)
    }
}

export function directionTo(
    position: Vector.t,
    map: GameMap,
    objType: GameObject.Type,
): Direction.t | null {
    const dd = _.compact(
        Direction.all.filter((x) => map.someObjectsAt(moveTo(position, x), objType)),
    )
    return dd.length ? dd[0] : null
}

export namespace Predicates {
    export function empty(map: GameMap, position: Vector.Vector) {
        return map.at(position).length == 0
    }

    export function has(objType: GameObject.Type) {
        return (position: Vector.Vector, map: GameMap) => map.someObjectsAt(position, objType)
    }

    export function doesNotHave(objType: GameObject.Type) {
        return (position: Vector.Vector, map: GameMap) => !map.everyObjectAt(position, objType)
    }

    export function insideWall(position: Vector.Vector, map: GameMap): boolean {
        if (
            position != null &&
            position.y > 1 &&
            position.y < map.height - 1 &&
            position.x < map.width
        )
            return map.at(position).some((obj) => obj != null && obj.type == "wall")
        else {
            return false
        }
    }
}

function repr(objs: GameObject.GameObject[]) {
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
