import { defineStore } from 'pinia'

export const useAppStateStore = defineStore('app-state', {
    state: () => ({
        edit: false,
        list: 'today',
    }),
})
