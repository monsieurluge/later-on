<template>
    <li
        draggable="true"
        :class="{ dragged: isDragged }"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @dragstart="onDragStart"
    >
        <span class="task-name" :class="{ done, working }" :title="name">{{ name }}</span>
        <div class="task-actions">
            <TaskButton @clicked="$emit('sizeClicked')">
                <template v-if="size === 'none'">•</template>
                <template v-if="size === 'small'">S</template>
                <template v-if="size === 'medium'">M</template>
                <template v-if="size === 'large'">L</template>
            </TaskButton>
        </div>
    </li>
</template>

<script setup>
import { ref } from 'vue'
import { isStringDragEvent } from '@/common/dragAndDrop'
import { useAppStateStore } from '@/stores/appStateStore'
import TaskButton from './TaskButton'

const emit = defineEmits(['sizeClicked', 'dragOverBottom', 'dragOverTop'])

const props = defineProps({
    done: { type: [Boolean, String], default: false },
    name: { type: String, required: true },
    size: { type: String, required: true },
    working: { type: Boolean, required: true },
})

const appState = useAppStateStore()
const isDragged = ref(false)

function onDragOver(event) {
    if (!isStringDragEvent(event)) return
    event.preventDefault()
    event.stopPropagation()
    appState.setDropTarget('task')
    const targetRect = event.target.getBoundingClientRect()
    const pos = event.clientY - targetRect.top
    pos < targetRect.height / 2
        ? emit('dragOverTop', props.name)
        : emit('dragOverBottom', props.name)
}

function onDragStart(event) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.setData('taskName', props.name)
    setTimeout(() => {
        appState.toState('task dragging')
        isDragged.value = true
    }, 10)
}

function onDragEnd() {
    isDragged.value = false
    appState.toState('idle')
}
</script>

<style scoped>
li {
    width: 100%;
    height: var(--item-height);
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    background-color: var(--b-low);
    border-radius: 5px;
    box-sizing: border-box;
    transition: background-color 0.3s;
}

li.dragged {
    display: none;
}

li:not(:last-child) {
    margin-bottom: 3px;
}

li:hover {
    background-color: var(--b-low-alt);
}

li.working::before {
    content: '';
    width: 6px;
    height: 6px;
    position: absolute;
    top: -2px;
    left: -2px;
    background-color: var(--f-med);
    border: 2px solid var(--background);
    border-radius: 50%;
}

.task-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1px;
    margin-right: calc((var(--item-height) - var(--item-button-size)) / 2);
}

.task-name {
    flex: 1;
    display: inline-block;
    padding: 0 10px;
    color: var(--f-high);
    font-size: 1em;
    font-family: monospace, sans;
    line-height: var(--item-height);
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: default;
}

.task-name.working::before {
    content: '';
    width: 6px;
    height: 6px;
    position: absolute;
    top: -2px;
    left: -2px;
    background-color: var(--f-med);
    border: 2px solid var(--background);
    border-radius: 50%;
}

.task-name.done {
    text-decoration: line-through;
}
</style>
