<template>
    <section class="tasks-list">
        <div class="separator top-separator"></div>
        <h2>today</h2>
        <form
            @dragover.prevent="onDragOverForm"
            @dragleave="onDragLeaveForm"
            @drop="onDropForm"
            @submit.prevent="addTask"
        >
            <input type="text" placeholder="+ add a task" v-model="name" />
            <div v-if="isFormDropTarget" class="dummy-item"></div>
        </form>
        <ul v-show="store.tasks.length > 0">
            <template v-for="task in store.tasks" :key="task.name">
                <TaskItem
                    v-bind="task"
                    draggable="true"
                    @dragend="onDragEnd"
                    @dragover.prevent="onDragOver(task.name)"
                    @dragstart="onDragStart(task.name)"
                    @drop="onDrop"
                    class="task-item"
                />
                <div v-if="task.name === dropTarget" class="dummy-item"></div>
                <!-- <div class="dummy-item"></div> -->
            </template>
        </ul>
        <div class="separator bottom-separator"></div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import TaskItem from './TaskItem'

const draggedTask = ref(null)
const dropTarget = ref(null)
const isFormDropTarget = ref(false)
const name = ref('')
const store = useTasksStore()

function addTask() {
    if (name.value.length === 0) return
    store.add(name.value)
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

function onDragStart(name) {
    draggedTask.value = name
}

function onDrop() {
    store.moveAfter(draggedTask.value, dropTarget.value)
    draggedTask.value = null
    dropTarget.value = null
    isFormDropTarget.value = false
}

function onDropForm() {
    store.moveOnTop(draggedTask.value)
    draggedTask.value = null
    dropTarget.value = null
    isFormDropTarget.value = false
}
</script>

<style scoped>
section {
    width: 400px;
    height: calc(100% - var(--header-height));
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.separator {
    --dot-bg: var(--background);
    --dot-color: var(--f-low);
    --dot-size: 2px;
    --dot-space: 10px;
    background-color: var(--background);
    background:
		linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
		var(--dot-color);
}

.top-separator {
    height: 56px;
    margin: 10px 0 10px 3px;
}

.bottom-separator {
    flex: 1;
    min-height: 60px;
    margin: 10px 0 0 3px;
}

h2 {
    margin: 0 0 3px;
    padding: 10px;
    font-size: 1rem;
    font-family: monospace, sans;
    background-color: var(--b-low);
    border-radius: 5px;
}

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
