import { defineStore } from 'pinia'

export const useAppState = defineStore('app-state', {
    state: () => ({
        lastDropTarget: null,
        state: 'idle',
    }),
    getters: {
        isEdit: (state) => state.state === 'edit',
        isIdle: (state) => state.state === 'idle',
        isTaskDragging: (state) => state.state === 'task dragging',
    },
    actions: {
        setDropTarget(target) {
            this.lastDropTarget = target
        },
        toggleEdit() {
            this.state = this.isEdit ? 'idle' : 'edit'
        },
        toState(newState) {
            this.state = newState
        },
    },
})
