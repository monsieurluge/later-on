import { defineStore } from 'pinia'

export const useAppStateStore = defineStore('app-state', {
    getters: {
        isEdit: (state) => state.state === 'edit',
        isIdle: (state) => state.state === 'idle',
        isTaskDragging: (state) => state.state === 'task dragging',
        nextList: (state) => state.list === 'today' ? 'tomorrow' : 'today',
    },
    state: () => ({
        lastDropTarget: null,
        list: 'today',
        state: 'idle',
    }),
})
