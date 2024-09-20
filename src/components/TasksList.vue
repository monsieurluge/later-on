<template>
    <section class="tasks-list">
        <form
            @dragleave="onDragLeaveForm"
            @dragover.prevent="onDragOverForm"
            @drop="onDropForm"
            @submit.prevent="addTask"
        >
            <input type="text" placeholder="+ add a task" v-model="name" />
            <div v-if="isFormDropTarget" class="dummy-item"></div>
        </form>
        <ul v-show="store.tasks.length > 0">
            <template v-for="task in store.from(listName)" :key="task.name">
                <TaskItem
                    class="task-item"
                    draggable="true"
                    v-bind="task"
                    @clicked="onTaskClicked(task.name)"
                    @dragend="onDragEnd"
                    @dragover.prevent="onDragOver(task.name)"
                    @dragstart="onDragStart($event, task.name)"
                    @drop="onDrop"
                    @sizeButtonClicked="onSizeButtonClicked(task.name)"
                />
                <div v-if="task.name === dropTarget" class="dummy-item"></div>
            </template>
        </ul>
    </section>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import TaskItem from './TaskItem'

const draggedTask = ref(null)
const dropTarget = ref(null)
const isFormDropTarget = ref(false);
const name = ref('')
const props = defineProps(['listName'])
const store = useTasksStore()

function addTask() {
    store.add({ name: name.value, list: props.listName })
    name.value = ''
}

function onDragEnd() {
    dropTarget.value = null
}

function onDragLeaveForm() {
    isFormDropTarget.value = false
}

function onDragOver(name) {
    dropTarget.value = name
}

function onDragOverForm() {
    dropTarget.value = null
    isFormDropTarget.value = true
}

function onDragStart(event, name) {
    draggedTask.value = name
    event.dataTransfer.setData('taskName', name)
}

function onDrop() {
    store.moveAfter(draggedTask.value, dropTarget.value)
    resetDraggableContext()
}

function onDropForm() {
    store.moveOnTop(draggedTask.value)
    resetDraggableContext()
}

function onSizeButtonClicked(name) {
    store.changeSize(name)
}

function onTaskClicked(name) {
    store.toggleCompletion(name)
}

function resetDraggableContext() {
    draggedTask.value = null
    dropTarget.value = null
    isFormDropTarget.value = false
}
</script>

<style scoped>
input {
    width: 100%;
    padding: 10px;
    font-size: 1em;
    font-family: monospace, sans;
    background-color: var(--b-low);
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
}

input:hover,
input:focus {
    background-color: var(--b-med);
}

ul {
    width: 100%;
    margin: 3px 0 0 0;
    padding: 0;
    list-style: none;
}

.task-item:not(:last-child) {
    margin-bottom: 3px;
}

.dummy-item {
    height: 3px;
    background-color: var(--b-med);
    border-radius: 1px;
}

.dummy-item:not(:last-child) {
    margin-bottom: 3px;
}

form .dummy-item {
    margin-top: 3px;
}
</style>
