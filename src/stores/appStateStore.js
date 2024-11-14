import { defineStore } from 'pinia'

export const useAppStateStore = defineStore('app-state', {
    state: () => ({
        lastDropTarget: null,
        list: 'today',
        state: 'idle',
    }),
    getters: {
        isEdit: (state) => state.state === 'edit',
        isIdle: (state) => state.state === 'idle',
        isTaskDragging: (state) => state.state === 'task dragging',
        nextList: (state) => state.list === 'today' ? 'tomorrow' : 'today',
    },
    actions: {
        setDropTarget(target) {
            this.lastDropTarget = target
        },
        toggleEdit() {
            this.state = this.isEdit ? 'idle' : 'edit'
        },
        toNextList() {
            this.list = this.nextList
        },
        toState(newState) {
            this.state = newState
        },
    },
})
