<template>
    <button :class="classObject" @dragleave="onDragLeave" @dragover.prevent.stop="onDragOver" @drop="onDrop">
        <ItemIcon which="add" small />
    </button>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppState } from '@/stores/appState'
import { useTasks } from '@/stores/tasks'
import ItemIcon from './ItemIcon'

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
    color: var(--f-low);
    line-height: var(--item-height-small);
    background-color: var(--b-low);
    border: none;
    border-radius: var(--border-radius-small);
    transition:
        max-height var(--transition),
        min-height var(--transition),
        line-height var(--transition),
        background-color var(--transition);
    overflow: hidden;
}

button:hover {
    color: var(--f-high);
    background-color: var(--b-med);
}

button:active {
    color: var(--f-med);
}

.expanded {
    max-height: var(--item-height);
    min-height: var(--item-height);
    line-height: var(--item-height);
}

.target {
    background-color: var(--b-med);
}
</style>
