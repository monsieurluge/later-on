<template>
    <CollectionsNav />
    <TasksList
        :list="tasksStore.list"
        @dragover.prevent.stop="onListDragOver"
        @dragenter.prevent.stop
        @keyup.enter="handleEnterKeyPressed"
    />
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import CollectionsNav from '@/components/CollectionsNav'
import TasksList from '@/components/TasksList.vue'
import { useAppState } from '@/stores/appState'
import { useTasks } from '@/stores/tasks'

const appStateStore = useAppState()
const route = useRoute()
const tasksStore = useTasks()

onMounted(() => {
    tasksStore.fetchTasks()
    window.addEventListener('keyup', event => {
        if (event.code === 'Escape' && appStateStore.isEdit) {
            appStateStore.toState('idle')
        }
    })
})

watch(
    () => route.params.id,
    newId => {
        tasksStore.toToday()
        tasksStore.setCurrentCollection(newId)
    },
)

function handleEnterKeyPressed() {
    if (appStateStore.isEdit) {
        appStateStore.toState('idle')
    }
}

function onListDragOver() {
    appStateStore.setDropTarget('tasks-lists')
}
</script>

<style scoped></style>
