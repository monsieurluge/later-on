<template>
    <ul @dragend="onDragEnd" @dragenter.prevent.stop @dragover.prevent.stop @drop="onDrop">
        <FakeTaskItem v-if="tasksList.length === 0" label="take a coffee, then add some tasks" />
        <template v-for="task in tasksList" :key="task.name">
            <DummyTaskItem v-if="appState.lastDropTarget === 'task' && dropTargetItem.name === task.name && dropTargetItem.position === 'top'" />
            <TaskItemInput v-if="appState.isEdit" :name="task.name" @submit="rename" />
            <TaskItem
                v-else
                :done="task.done"
                :name="task.name"
                :size="task.size"
                :working="currentTaskName === task.name"
                @click="toggleCompletion(task.name)"
                @dragOverTop="onDragOverTop"
                @dragOverBottom="onDragOverBottom"
                @sizeClicked="changeSize(task.name)"
            />
            <DummyTaskItem
                v-if="appState.lastDropTarget === 'task' && dropTargetItem.name === task.name && dropTargetItem.position === 'bottom'"
            />
        </template>
    </ul>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStateStore } from '@/stores/appStateStore'
import { useTasksStore } from '@/stores/tasksStore'
import DummyTaskItem from './DummyTaskItem'
import FakeTaskItem from './FakeTaskItem'
import TaskItem from './TaskItem'
import TaskItemInput from './TaskItemInput'

const props = defineProps({
    list: { type: String, required: true },
})

const appState = useAppStateStore()
const fakeDropTargetItem = { name: '', position: 'none' }
const dropTargetItem = ref(fakeDropTargetItem)
const tasks = useTasksStore()

const currentTaskName = computed(() => {
    const workingOn = tasks.tasks.filter(({ list }) => list === 'today').find(({ done }) => !done)
    return workingOn ? workingOn.name : ''
})

const tasksList = computed(() => tasks.from(props.list))

function changeSize(name) {
    tasks.changeSize(name)
}

function onDragEnd() {
    dropTargetItem.value = fakeDropTargetItem
}

function onDragOverBottom(name) {
    dropTargetItem.value = {
        name,
        position: 'bottom',
    }
}

function onDragOverTop(name) {
    dropTargetItem.value = {
        name,
        position: 'top',
    }
}

function onDrop(event) {
    const task = event.dataTransfer.getData('taskName')
    if (!task) {
        dropTargetItem.value = fakeDropTargetItem
        return
    }
    event.preventDefault()
    event.stopPropagation()
    if (dropTargetItem.value.position === 'top') {
        tasks.moveBefore(event.dataTransfer.getData('taskName'), dropTargetItem.value.name)
    }
    if (dropTargetItem.value.position === 'bottom') {
        tasks.moveAfter(event.dataTransfer.getData('taskName'), dropTargetItem.value.name)
    }
    dropTargetItem.value = fakeDropTargetItem
}

function rename(name, newName) {
    if (newName.length === 0) {
        tasks.remove(name)
        return
    }
    tasks.rename({ newName, oldName: name })
}

function toggleCompletion(name) {
    tasks.toggleCompletion(name)
}
</script>

<style scoped>
ul {
    width: var(--main-width);
    margin: 3px 0 0 0;
    padding: 0;
    list-style: none;
}
</style>
