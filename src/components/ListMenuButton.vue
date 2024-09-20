<template>
    <button
        :class="classObject"
        @dragend="onDragEnd"
        @dragleave="isDropTarget = false"
        @dragover.prevent="isDropTarget = !active"
        @drop="onDrop($event)"
    >{{ label }}</button>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const props = defineProps(['active', 'label', 'left', 'right'])

const isDropTarget = ref(false)

const classObject = computed(() => {
    return {
        active: props.active,
        left: !!props.left,
        right: !!props.right,
        target: isDropTarget.value,
    }
})

const tasks = useTasksStore()

function onDrop(event) {
    isDropTarget.value = false
    if (props.active) return
    tasks.moveTo({
        list: props.label,
        name: event.dataTransfer.getData('taskName'),
    })
}
</script>

<style scoped>
button {
    flex: 1;
    padding: 10px;
    color: var(--f-low);
    font-family: monospace, sans;
    font-size: 1rem;
    text-align: center;
    border: none;
    border-radius: 0;
    background-color: var(--b-low);
    cursor: default;
}

button:not(.active):hover,
button.target {
    color: var(--f-high);
    background-color: var(--b-med);
}

button.active {
    color: var(--f-high);
    font-weight: bold;
}

.left {
    text-align: left;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.right {
    text-align: right;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}
</style>
