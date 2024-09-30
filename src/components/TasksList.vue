<template>
    <section class="tasks-list">
        <TaskAddForm :listName="listName" />
        <ul v-show="store.tasks.length > 0">
            <template v-for="task in store.from(listName)" :key="task.name">
                <TaskItem
                    class="task-item"
                    v-bind="task"
                    :working="currentTaskName === task.name"
                    :draggable="isDraggable"
                    :editable="config.edit"
                    @dragleave="onDragLeave"
                    @dragover.prevent="onDragOver($event, task.name)"
                    @dragstart="onDragStart($event, task.name)"
                    @drop.prevent="onDrop"
                />
                <div v-if="task.name === dropTarget" class="dummy-item"></div>
            </template>
        </ul>
    </section>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'
import { isStringDragEvent } from '@/common/dragAndDrop'
import { useConfigStore } from '@/stores/configStore'
import { useTasksStore } from '@/stores/tasksStore'
import TaskAddForm from './TaskAddForm'
import TaskItem from './TaskItem'

defineProps(['listName'])

const config = useConfigStore()
const dropTarget = ref(null)
const isFormDropTarget = ref(false)
const store = useTasksStore()

const isDraggable = computed(() => {
    return !config.edit
})

const currentTaskName = computed(() => {
    const workingOn = store.tasks.filter(({ list }) => list === 'today').find(({ done }) => !done)
    return workingOn ? workingOn.name : ''
})

function onDragLeave() {
    dropTarget.value = null
}

function onDragOver(event, name) {
    if (!isStringDragEvent(event)) return
    dropTarget.value = name
}

function onDragStart(event, name) {
    event.dataTransfer.setData('taskName', name)
}

function onDrop(event) {
    if (event.dataTransfer.getData('taskName')) store.moveAfter(event.dataTransfer.getData('taskName'), dropTarget.value)
    dropTarget.value = null
    isFormDropTarget.value = false
}
</script>

<style scoped>
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
</style>
