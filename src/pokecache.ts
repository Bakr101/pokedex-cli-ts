type CacheEntry<T> = {
    createdAt: number,
    data: T
}

export class PokeCache {
    #cache = new Map<string, CacheEntry<any>>()
    #reapIntervalID: NodeJS.Timeout | undefined = undefined
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval
        this.#startReapLoop()
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, {
            createdAt: Date.now(),
            data: val
        })
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key)
        if (!entry) return undefined
        return entry.data
    }

    #reap() {
        const now = Date.now()
        for (const [key, entry] of this.#cache) {
            if (now - entry.createdAt > this.#interval) {
                this.#cache.delete(key)
            }
        }
    }

    #startReapLoop() {
        this.#reapIntervalID = setInterval(() => {
            this.#reap()
        }, this.#interval)
    }

    stopReapLoop() {
        if (this.#reapIntervalID) {
            clearInterval(this.#reapIntervalID)
            this.#reapIntervalID = undefined
        }
    }

    logCache() {
        for (const [key, entry] of this.#cache) {
            console.log(`${key}: created at${entry.createdAt}`)
            console.log(JSON.stringify(entry.data, null, 2))
        }
    }
}

