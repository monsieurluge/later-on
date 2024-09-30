<template>
    <button
        :class="{ dropTarget: isDropTarget }"
        @dragend="isDropTarget = false"
        @dragleave="isDropTarget = false"
        @dragover.prevent="onDragOver"
        @drop.prevent="isDropTarget = false"
    >
        <span class="label">{{ label }}</span><span class="arrow">&rarr;</span>
    </button>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { isStringDragEvent } from '@/common/dragAndDrop'

defineProps(['label'])

const isDropTarget = ref(false)

function onDragOver(event) {
    if (!isStringDragEvent(event)) return
    isDropTarget.value = true
}
</script>

<style scoped>
button {
    position: relative;
    padding: 10px;
    color: var(--f-high);
    font-family: monospace, sans;
    font-size: 1rem;
    text-align: left;
    border: none;
    background-color: var(--b-low);
    overflow: hidden;
    transition: background-color var(--transition);
}

button:hover,
button.dropTarget {
    background-color: var(--b-med);
}

.arrow {
    position: absolute;
    left: 100%;
    color: var(--b-low);
    transition:
        color var(--transition),
        transform var(--transition);
}

.label {
    font-weight: bold;
}

button:hover .arrow,
button.dropTarget .arrow {
    transform: translateX(-20px);
    color: var(--f-high);
}
</style>
