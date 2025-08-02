<template>
    <li draggable="true" ref="drop-zone" :class="{ dragged: isDragged }" @dragend="onDragEnd" @dragstart="onDragStart">
        <span class="task-name" :class="{ done, working }" :title="name">{{ name }}</span>
        <div class="task-actions">
            <ActionButton @clicked="$emit('sizeClicked')">
                {{ sizeButtonSymbol }}
            </ActionButton>
        </div>
    </li>
</template>

<script setup>
import { computed, useTemplateRef, ref, watch } from 'vue'
import { useTaskDropZone } from '@/composables/taskDropZone'
import { useAppState } from '@/stores/appState'
import ActionButton from './ActionButton'

const emit = defineEmits(['sizeClicked', 'dragOverBottom', 'dragOverTop'])

const props = defineProps({
    done: { type: [Boolean, String], default: false },
    name: { type: String, required: true },
    size: { type: String, required: true },
    working: { type: Boolean, required: true },
})

const appState = useAppState()
const dropZone = useTemplateRef('drop-zone')
const isDragged = ref(false)
const { isOverBottom, isOverTop } = useTaskDropZone({ name: 'task', target: dropZone })

const sizeButtonSymbol = computed(() => ({
        large: 'L',
        medium: 'M',
        none: '•',
        small: 'S',
    }[props.size])
)

watch(isOverBottom, value => value === true && emit('dragOverBottom', props.name))

watch(isOverTop, value => value === true && emit('dragOverTop', props.name))

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
