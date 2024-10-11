<template>
    <li v-if="appState.edit">
        <input
            class="name"
            placeholder="remove the task ?"
            type="text"
            :value="name"
            @blur="submit"
            @focusin="onNameChange"
            @input="onNameChange"
            @keyup.enter="submitAndQuit"
        />
    </li>
    <li
        v-else
        draggable="true"
        :class="{ done, working, dragged: isDragged }"
        @click="toggleCompletion"
        @dragend="onDragEnd"
        @dragover="onDragOver"
        @dragstart="onDragStart"
    >
        <span class="name" :title="name">{{ name }}</span>
        <button :title="size" @click.prevent.stop="changeSize">
            <template v-if="size === 'none'"><span class="empty all-empty">▫▫▫</span></template>
            <template v-if="size === 'small'"><span class="empty">▫▫</span>▪</template>
            <template v-if="size === 'medium'"><span class="empty">▫</span>▪▪</template>
            <template v-if="size === 'large'">▪▪▪</template>
        </button>
    </li>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'
import { useAppStateStore } from '@/stores/appStateStore'
import { useDragDropStore } from '@/stores/dragDropStore';
import { useTasksStore } from '@/stores/tasksStore'
import { isStringDragEvent } from '@/common/dragAndDrop'

const appState = useAppStateStore()
const dragDrop = useDragDropStore()
const emit = defineEmits(['dragOverBottom', 'dragOverTop'])
const isDragged = ref(false)
const newName = ref('')
const props = defineProps(['done', 'name', 'size', 'working'])
const tasks = useTasksStore()

function changeSize() {
    tasks.changeSize(props.name)
}

function submit() {
    if (newName.value.length === 0) {
        tasks.remove(props.name)
        return
    }
    tasks.rename({ oldName: props.name, newName: newName.value })
}

function submitAndQuit() {
    submit()
    appState.edit = false
}

function onDragOver(event) {
    if (!isStringDragEvent(event)) return
    event.preventDefault()
    event.stopPropagation()
    dragDrop.lastDropTarget = 'task'
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
    dragDrop.isTaskDragging = true
    setTimeout(() => {
        isDragged.value = true
    }, 10)
}

function onDragEnd() {
    isDragged.value = false
    dragDrop.isTaskDragging = false
}

function onNameChange(event) {
    newName.value = event.target.value
}

function toggleCompletion() {
    tasks.toggleCompletion(props.name)
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
    background-color: var(--b-low);
    border: none;
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

.name {
    width: 100%;
    padding: 0 10px;
    color: var(--f-high);
    font-size: 1em;
    font-family: monospace, sans;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: default;
}

input.name {
    height: 100%;
    border: none;
    background-color: transparent;
    cursor: text;
}

input.error {
    color: var(--f-inv);
    background-color: var(--b-inv);
}

.done .name {
    text-decoration: line-through;
}

button {
    height: 100%;
    padding: 3px;
    color: var(--f-low);
    font-family: monospace, sans;
    text-orientation: sideways;
    writing-mode: vertical-lr;
    background-color: transparent;
    border: none;
    border-left: 1px solid transparent;
    border-radius: 0 5px 5px 0;
    box-sizing: border-box;
    transition:
        background-color var(--transition),
        border-color var(--transition),
        color var(--transition);
}

li:hover button {
    border-color: var(--background);
}

.empty {
    color: var(--f-low);
    transition: color var(--transition);
}

.all-empty {
    color: transparent;
}

button:hover {
    color: var(--f-med);
}

li:hover .all-empty {
    color: var(--f-low);
}

button:hover .all-empty {
    color: var(--f-med);
}
</style>
