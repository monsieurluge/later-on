import { defineStore } from 'pinia'

export const useDragDropStore = defineStore('dragDrop', {
    state: () => ({
        lastDropTarget: null,
    }),
})
