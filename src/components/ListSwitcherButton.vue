<template>
    <button
        :class="{ target: isDropTarget }"
        @click="$emit('click')"
        @dragend="isDropTarget = false"
        @dragleave="isDropTarget = false"
        @dragover="onDragOver"
        @drop="onDrop"
    >{{ current }}</button>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'
import { isStringDragEvent } from '@/common/dragAndDrop'

defineProps({
    current: { type: String, required: true },
})

const emit = defineEmits(['click', 'taskDropped'])
const isDropTarget = ref(false)

function onDragOver(event) {
    if (!isStringDragEvent(event)) return
    event.preventDefault()
    event.stopPropagation()
    isDropTarget.value = true
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
button {
    flex: 1;
    height: var(--item-height);
    padding: 10px;
    color: var(--f-high);
    font-family: monospace, sans;
    font-size: 1rem;
    font-weight: bold;
    text-align: left;
    border: none;
    background-color: var(--b-low);
    overflow: hidden;
    transition:
        color var(--transition),
        background-color var(--transition);
}

button:hover {
    background-color: var(--b-med);
}

button:active {
    color: var(--f-med);
}

button.target {
    color: var(--b-med);
    background-color: var(--b-med);
}
</style>
