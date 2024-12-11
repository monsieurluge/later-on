<template>
    <div ref="drop-zone" class="task-drop-zone" :class="{ target: isDropTarget }">
        <slot>{{ label }}</slot>
    </div>
</template>

<script setup>
import { ref, useTemplateRef, watch } from 'vue'
import { useTaskDropZone } from '@/composables/taskDropZone'

defineProps({
    label: { type: String },
})

const emit = defineEmits(['taskDropped'])
const dropZone = useTemplateRef('drop-zone')
const isDropTarget = ref(false)
const { isOver } = useTaskDropZone({
    name: 'remove task',
    onDrop: ({ name }) => emit('taskDropped', name),
    target: dropZone,
})

watch(isOver, value => isDropTarget.value = value)
</script>

<style scoped>
.task-drop-zone {
    min-width: var(--item-height);
    height: var(--item-height);
    flex: 1;
    color: var(--f-high);
    font-family: monospace, sans;
    font-size: 1rem;
    line-height: var(--item-height);
    text-align: center;
    background-color: var(--b-low);
    transition:
        color var(--transition),
        background-color var(--transition);
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
