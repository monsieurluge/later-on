<template>
    <div
        class="task-drop-zone"
        :class="{ target: isDropTarget }"
        @dragleave="isDropTarget = false"
        @dragover="onDragOver"
        @drop="onDrop"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M17 2h-3.5l-1-1h-5l-1 1H3v2h14zM4 17a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5H4z"/></svg>
    </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { isStringDragEvent } from '@/common/dragAndDrop'
import { useAppStateStore } from '@/stores/appStateStore'

const appState = useAppStateStore()
const emit = defineEmits(['taskDropped'])
const isDropTarget = ref(false)

function onDragOver(event) {
    if (!isStringDragEvent(event)) return
    event.preventDefault()
    event.stopPropagation()
    isDropTarget.value = true
    appState.lastDropTarget = 'task-drop-zone'
}

function onDrop(event) {
    if (!isStringDragEvent(event)) return
    event.preventDefault()
    event.stopPropagation()
    isDropTarget.value = false
    emit('taskDropped', event.dataTransfer.getData('taskName'))
}
</script>

<style scoped>
.task-drop-zone {
    height: var(--item-height);
    width: fit-content;
    padding: 0 10px;
    color: var(--f-high);
    line-height: var(--item-height);
    text-align: center;
    background-color: var(--b-low);
    transition:
        color var(--transition),
        background-color var(--transition),
}

.large {
    width: 100%;
    flex: 1;
}

.target {
    color: var(--f-high);
    background-color: var(--b-med);
}

svg {
    display: inline-block;
    vertical-align: middle;
    aspect-ratio: 1 / 1;
    height: 1.2rem;
    color: var(--f-med);
    fill: currentColor;
}
</style>
