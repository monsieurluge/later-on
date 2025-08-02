<template>
    <div class="tasks-list">
        <TasksListHeader :list="list" />
        <TaskAddForm :tasksCount="tasksList.length" @task-submitted="addTask" />
        <ul @dragend="onDragEnd" @dragenter.prevent.stop @dragover.prevent.stop @drop="onDrop">
            <FakeTaskItem
                v-if="tasksList.length === 0"
                class="item"
                label="take a coffee, then add some tasks"
            />
            <template v-for="task in tasksList" :key="task.name">
                <DummyTaskItem
                    v-if="appState.lastDropTarget === 'task' && dropTargetItem.name === task.name && dropTargetItem.position === 'top'"
                    class="item dummy-item"
                />
                <TaskItemInput
                    v-if="appState.isEdit"
                    class="item"
                    :name="task.name"
                    @submit="rename"
                />
                <TaskItem
                    v-else
                    class="item"
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
                    class="item dummy-item"
                />
            </template>
        </ul>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppState } from '@/stores/appState'
import { useTasks } from '@/stores/tasks'
import DummyTaskItem from './DummyTaskItem'
import FakeTaskItem from './FakeTaskItem'
import TaskAddForm from './TaskAddForm'
import TaskItem from './TaskItem'
import TaskItemInput from './TaskItemInput'
import TasksListHeader from './TasksListHeader'

const props = defineProps({
    list: { type: String, required: true },
})

const appState = useAppState()
const fakeDropTargetItem = { name: '', position: 'none' }
const dropTargetItem = ref(fakeDropTargetItem)
const tasks = useTasks()

const currentTaskName = computed(() => {
    const workingOn = tasks.tasks
        .filter(({ list }) => list === 'today')
        .find(({ done }) => !done)
    return workingOn ? workingOn.name : ''
})

const tasksList = computed(() => (props.list === 'today' ? tasks.fromToday : tasks.fromTomorrow))

function addTask(name) {
    tasks.add({ list: props.list, name })
}

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
        tasks.moveBefore({
            name: event.dataTransfer.getData('taskName'),
            target: dropTargetItem.value.name,
        })
    }
    if (dropTargetItem.value.position === 'bottom') {
        tasks.moveAfter({
            name: event.dataTransfer.getData('taskName'),
            target: dropTargetItem.value.name,
        })
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
.tasks-list {
    padding: 8px 0;
    background-color: var(--background);
}

ul {
    width: var(--main-width);
    margin: 3px 0 0 0;
    padding: 0;
    list-style: none;
}

.item:not(:last-child) {
    margin-bottom: 3px;
}
</style>
