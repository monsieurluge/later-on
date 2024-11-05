<template>
    <div id="tasks-list" @dragover.prevent.stop="onListDragOver" @dragenter.prevent.stop>
        <TasksListHeader :list="list" />
        <TaskAddForm @task-submitted="addTask" />
        <TasksList :list="list" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStateStore } from '@/stores/appStateStore'
import { useTasksStore } from '@/stores/tasksStore'
import TasksListHeader from '@/components/TasksListHeader'
import TaskAddForm from '@/components/TaskAddForm'
import TasksList from '@/components/TasksList.vue'

const props = defineProps({
    list: { type: String, required: true }
})

const appState = useAppStateStore()
const tasks = useTasksStore()

onMounted(() => {
    window.addEventListener('keyup', event => {
        if (event.code === 'Escape' && appState.isEdit) {
            appState.state = 'idle'
        }
    })
})

function addTask(name) {
    tasks.add({ list: props.list, name })
}

function onListDragOver() {
    appState.lastDropTarget = 'tasks-lists'
}
</script>

<style scoped>
#tasks-list {
    padding: 8px 0;
    background-color: var(--background);
}
</style>
