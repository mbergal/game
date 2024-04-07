export type Logger = (message: string) => void

export function setIsEnabled(f: (name: string) => boolean) {
    isEnabled = f
}

export function setTime(time: number) {
    tick = time
}

export function make<T extends string>(name: T): Logger {
    return (message: string) => {
        if (isEnabled(name)) {
            console.log(tick.toString().padStart(4, "0") + " " + message)
        }
    }
}

let isEnabled: (name: string) => boolean = (_) => true
let tick = 0
