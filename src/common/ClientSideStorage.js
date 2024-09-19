export class ClientSideStorage {
    constructor(storageKey) {
        this.storageKey = storageKey
    }

    load() {
        try {
            const tasks = JSON.parse(localStorage.getItem(this.storageKey))
            return tasks || []
        } catch (error) {
            console.error(`[store] failed to get the tasks from the local storage "${this.storageKey}":`, error)
            return []
        }
    }

    save(tasks) {
        try {
            const data = JSON.stringify(tasks)
            localStorage.setItem(this.storageKey, data)
        } catch (error) {
            console.error(`[store] failed to store the tasks in the local storage "${this.storageKey}":`, error)
        }
    }
}
