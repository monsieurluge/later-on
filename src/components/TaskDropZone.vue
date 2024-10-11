<template>
    <div
        class="task-drop-zone"
        :class="classList"
        @dragleave="isDropTarget = false"
        @dragover="onDragOver"
        @drop="onDrop"
    >{{ label }}</div>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref } from 'vue'
import { isStringDragEvent } from '@/common/dragAndDrop'
import { useDragDropStore } from '@/stores/dragDropStore'

defineProps({
    label: { type: String, required: true },
})

const dragDrop = useDragDropStore()
const emit = defineEmits(['taskDropped'])
const isDropTarget = ref(false)

const classList = computed(() => {
    return {
        available: dragDrop.isTaskDragging,
        target: isDropTarget.value,
    }
})

function onDragOver(event) {
    if (!isStringDragEvent(event)) return
    event.preventDefault()
    event.stopPropagation()
    isDropTarget.value = true
    dragDrop.lastDropTarget = 'task-drop-zone'
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
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    margin: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--f-low);
    background-color: transparent;
    border: 2px dashed var(--b-low);
    border-radius: var(--border-radius-large);
    box-sizing: border-box;
    opacity: 0;
    transition:
        color var(--transition),
        background-color var(--transition),
        border-color var(--transition),
        opacity var(--transition);
}

.available {
    opacity: 1;
}

.target {
    color: var(--f-high);
    background-color: var(--b-med);
    border-color: var(--b-med);
}
</style>
