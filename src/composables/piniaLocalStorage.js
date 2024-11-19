import { useLocalStorage } from '@vueuse/core'

export function usePiniaLocalStorage({ storageKey }) {
    const storage = useLocalStorage(storageKey, [])

    return function applyToStore({ options, store }) {
        if (!Array.isArray(options?.persist)) return

        store.$subscribe((_, state) => {
            const data = options.persist.reduce((result, key) => {
                result[key] = state[key]
                return result
            }, {})
            storage.value = data
        }, { detached: true })

        options.persist.forEach(key => {
            store.$state[key] = storage.value[key] || store.$state[key]
        })
    }
}
