export class ClientSideStorage {
    constructor(storageKey) {
        this.storageKey = storageKey
    }

    load(fallback) {
        try {
            const tasks = JSON.parse(localStorage.getItem(this.storageKey))
            return tasks || fallback
        } catch (error) {
            console.error(`[store] failed to get data from the local storage "${this.storageKey}":`, error)
            return fallback
        }
    }

    save(tasks) {
        try {
            const data = JSON.stringify(tasks)
            localStorage.setItem(this.storageKey, data)
        } catch (error) {
            console.error(`[store] failed to store data to the local storage "${this.storageKey}":`, error)
        }
    }
}
