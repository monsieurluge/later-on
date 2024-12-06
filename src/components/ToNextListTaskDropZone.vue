<template>
    <div class="task-drop-zone" ref="drop-zone" :class="{ target: isDropTarget }">{{ label }}</div>
</template>

<script setup>
import { ref, useTemplateRef, watch } from 'vue'
import { useTaskDropZone } from '@/composables/taskDropZone'

defineProps({
    label: { type: String, required: true },
})

const dropZone = useTemplateRef('drop-zone')
const emit = defineEmits(['taskDropped'])
const isDropTarget = ref(false)
const { isOver } = useTaskDropZone({
    name: 'next list',
    onDrop: ({ name }) => emit('taskDropped', name),
    target: dropZone,
})

watch(isOver, value => isDropTarget.value = value)
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
        background-color var(--transition);
}

.target {
    color: var(--f-high);
    background-color: var(--b-med);
}
</style>
