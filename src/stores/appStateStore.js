import { defineStore } from 'pinia'

export const useAppStateStore = defineStore('app-state', {
    getters: {
        nextList: (state) => state.list === 'today' ? 'tomorrow' : 'today',
    },
    state: () => ({
        edit: false,
        list: 'today',
    }),
})
