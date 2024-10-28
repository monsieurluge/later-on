<template>
    <div
        class="task-drop-zone"
        :class="{ target: isDropTarget }"
        @dragleave="isDropTarget = false"
        @dragover="onDragOver"
        @drop="onDrop"
    >{{ label }}</div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'
import { isStringDragEvent } from '@/common/dragAndDrop'
import { useAppStateStore } from '@/stores/appStateStore'

defineProps({
    label: { type: String, required: true },
})

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
    padding: 0 10px;
    flex: 1;
    color: var(--f-high);
    font-family: monospace, sans;
    font-size: 1rem;
    text-align: left;
    line-height: var(--item-height);
    background-color: var(--b-low);
    transition:
        color var(--transition),
        background-color var(--transition),
}

.target {
    color: var(--f-high);
    background-color: var(--b-med);
}
</style>
