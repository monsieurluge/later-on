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
import { useAppState } from '@/stores/appState'
import { useTasks } from '@/stores/tasks'
import TasksList from '@/components/TasksList.vue'

defineProps({
    list: { type: String, required: true }
})

const appState = useAppState()
const tasks = useTasks()

onMounted(async () => {
    await tasks.fetchTasks()
    window.addEventListener('keyup', event => {
        if (event.code === 'Escape' && appState.isEdit) {
            appState.toState('idle')
        }
    })
})

function handleEnterKeyPressed() {
    if (appState.isEdit) {
        appState.toState('idle')
    }
}

function onListDragOver() {
    appState.setDropTarget('tasks-lists')
}
</script>

<style scoped>
#tasks-list {
    padding: 8px 0;
    background-color: var(--background);
}
</style>
