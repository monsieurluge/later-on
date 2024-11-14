<template>
    <TasksList
        :list="list"
        @dragover.prevent.stop="onListDragOver"
        @dragenter.prevent.stop
        @keyup.enter="handleEnterKeyPressed"
    />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStateStore } from '@/stores/appStateStore'
import { useTasksStore } from '@/stores/tasksStore'
import TasksList from '@/components/TasksList.vue'

defineProps({
    list: { type: String, required: true }
})

const appState = useAppStateStore()
const tasks = useTasksStore()

onMounted(() => {
    tasks.initialize()
    window.addEventListener('keyup', event => {
        if (event.code === 'Escape' && appState.isEdit) {
            appState.state = 'idle'
        }
    })
})

function handleEnterKeyPressed() {
    if (appState.isEdit) {
        appState.state = 'idle'
    }
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
