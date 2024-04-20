import { assert } from "@/utils/assert"

export function check<T>(t: () => T, f: (t: T) => boolean, maxAttempts: number = 10): T | null {
    let attempt = 0
    while (attempt < maxAttempts) {
        attempt++
        const tt = t()
        if (f(tt)) return tt
    }

    return null
}

export function ensure<T>(t: () => T, f: (t: T) => boolean, maxAttempts: number = 10): T {
    const tt = check(t, f, maxAttempts)
    assert(tt != null)
    return tt
}
