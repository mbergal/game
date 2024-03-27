export namespace Logging {
    export type Logger = (message: string) => void

    export function setIsEnabled(f: (name: string) => boolean) {
        isEnabled = f
    }

    export function setTime(tick: number) {}
    export function make<T extends string>(name: T): Logger {
        return (message: string) => {
            if (isEnabled(name)) {
                console.log(tick.toString().padStart(4, "0") + " " + message)
            }
        }
    }

    let isEnabled: (name: string) => boolean = () => true
    let tick = 0
}
