<template>
    <div ref="drop-zone" class="task-drop-zone" :class="{ target: isDropTarget }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="1rem" height="1rem">
            <path fill="currentColor" d="M17 2h-3.5l-1-1h-5l-1 1H3v2h14zM4 17a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5H4z" />
        </svg>
    </div>
</template>

<script setup>
import { ref, useTemplateRef, watch } from 'vue'
import { useTaskDropZone } from '@/composables/taskDropZone'

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
    width: var(--item-height);
    height: var(--item-height);
    color: var(--f-high);
    line-height: var(--item-height);
    text-align: center;
    background-color: var(--b-low);
    transition:
        color var(--transition),
        background-color var(--transition);
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
