import { defineStore } from 'pinia'

export const useDragDropStore = defineStore('dragDrop', {
    state: () => ({
        isTaskDragging: false,
        lastDropTarget: null,
    }),
})
