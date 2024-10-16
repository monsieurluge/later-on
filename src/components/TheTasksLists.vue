<template>
    <div id="tasks-lists" @dragover.prevent.stop="onListDragOver" @dragenter.prevent.stop>
        <ListsMenu />
        <TaskAddForm @task-submitted="addTask" />
        <TasksList list-name="today" v-show="appState.list === 'today'" />
        <TasksList list-name="tomorrow" v-show="appState.list === 'tomorrow'" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStateStore } from '@/stores/appStateStore'
import { useDragDropStore } from '@/stores/dragDropStore'
import { useTasksStore } from '@/stores/tasksStore'
import ListsMenu from './TheListsMenu'
import TaskAddForm from './TaskAddForm'
import TasksList from './TasksList.vue'

const appState = useAppStateStore()
const dragDrop = useDragDropStore()
const tasks = useTasksStore()

onMounted(() => {
    window.addEventListener('keyup', event => {
        if (event.code === 'Escape' && appState.isEdit) {
            appState.state = 'idle'
        }
    })
})

function addTask(name) {
    tasks.add({ name, list: appState.list })
}

function onListDragOver() {
    dragDrop.lastDropTarget = 'tasks-lists'
}
</script>

<style scoped>
#tasks-lists {
    padding: 10px 0;
    background-color: var(--background);
}
</style>
