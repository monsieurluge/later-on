<template>
    <div
        :class="{ isDropTarget }"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover.prevent.stop
        @drop.prevent.stop="onDrop"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-if="isTaskDragged" class="delete-icon">
            <ellipse cx="12" cy="7" fill="currentColor" fill-opacity="0.25" rx="7" ry="3" />
            <path fill="currentColor" fill-rule="evenodd" d="M12 10c3.336 0 6.127-1 6.83-2.34c.01-.02.06-.006.057.018l-1.775 10.647a1.8 1.8 0 0 1-.646 1.102a7.15 7.15 0 0 1-8.932 0a1.8 1.8 0 0 1-.646-1.102L5.113 7.678c-.004-.024.046-.039.058-.017C5.873 9 8.664 10 12 10" clip-rule="evenodd" />
        </svg>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { isStringDragEvent } from '@/common/dragAndDrop'
import { useDragDropStore } from '@/stores/dragDropStore'
import { useTasksStore } from '@/stores/tasksStore'

const dragDrop = useDragDropStore()
const isDropTarget = ref(false)
const isTaskDragged = ref(false)
const tasks = useTasksStore()

function onDragEnter(event) {
    dragDrop.lastDropTarget = 'drop-zone'
    isDropTarget.value = true
    isTaskDragged.value = isStringDragEvent(event)
}

function onDragLeave() {
    isDropTarget.value = false
    isTaskDragged.value = false
}

function onDrop(event) {
    isDropTarget.value = false
    isTaskDragged.value = false
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    background-color: transparent;
    border-radius: var(--border-radius-large);
    transition: background-color var(--transition);
}

.isDropTarget {
    background-color: var(--b-med);
}

.delete-icon {
    width: 30px;
    height: 30px;
}
</style>
