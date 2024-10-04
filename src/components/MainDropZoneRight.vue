<template>
    <div
        :class="{ isDropTarget }"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover.prevent.stop
        @drop.prevent.stop="onDrop"
    ></div>
</template>

<script setup>
import { ref } from 'vue'
import { isStringDragEvent } from '@/common/dragAndDrop'
import { useDragDropStore } from '@/stores/dragDropStore'
import { useTasksStore } from '@/stores/tasksStore'

const dragDrop = useDragDropStore()
const isDropTarget = ref(false)
const tasks = useTasksStore()

function onDragEnter() {
    dragDrop.lastDropTarget = 'drop-zone'
    isDropTarget.value = true
}

function onDragLeave() {
    isDropTarget.value = false
}

function onDrop(event) {
    isDropTarget.value = false
    if (isStringDragEvent(event)) {
        const task = event.dataTransfer.getData('taskName')
        if (!task) return
        tasks.remove(task)
    }
}
</script>

<style scoped>
div {
    flex: 1;
    margin: 20px;
    background-color: transparent;
    border-radius: var(--border-radius-large);
    transition: background-color var(--transition);
}

.isDropTarget {
    background-color: var(--b-med);
}
</style>
