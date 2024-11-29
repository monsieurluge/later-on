<template>
    <button :class="classObject" @dragleave="onDragLeave" @dragover.prevent.stop="onDragOver" @drop="onDrop">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g fill="currentColor"><path d="M5 11a1 1 0 1 1 0-2h10a1 1 0 1 1 0 2z" /><path d="M9 5a1 1 0 0 1 2 0v10a1 1 0 1 1-2 0z" /></g></svg>
    </button>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppState } from '@/stores/appState'
import { useTasks } from '@/stores/tasks'

const appStore = useAppState()
const isDropTarget = ref(false)
const tasksStore = useTasks()

const classObject = computed(() => ({
    expanded: appStore.isTaskDragging,
    target: isDropTarget.value === true,
}))

function onDragLeave() {
    isDropTarget.value = false
}

function onDragOver() {
    isDropTarget.value = true
}

function onDrop(event) {
    isDropTarget.value = false
    const task = event.dataTransfer.getData('taskName')
    if (!task) return
    event.preventDefault()
    event.stopPropagation()
    tasksStore.toNewCollection(task)
}
</script>

<style scoped>
button {
    max-height: var(--item-height-small);
    min-height: var(--item-height-small);
    width: var(--item-height);
    padding: 0;
    margin: 0;
    background-color: var(--b-low);
    border: none;
    border-radius: var(--border-radius-small);
    transition:
        max-height var(--transition),
        min-height var(--transition),
        background-color var(--transition);
    overflow: hidden;
}

button:hover {
    background-color: var(--b-med);
}

button svg {
    height: var(--item-height-small);
    width: var(--item-height-small);
    color: var(--f-low);
}

button:hover svg {
    color: var(--f-high);
}

button:active svg {
    color: var(--f-med);
}

.expanded {
    max-height: var(--item-height);
    min-height: var(--item-height);
}

.target {
    background-color: var(--b-med);
}
</style>
