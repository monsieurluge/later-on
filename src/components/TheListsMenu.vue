<template>
    <menu>
        <ListSwitcherButton :current="appState.list" @click="switchList" />
        <TaskEditButton v-if="hasTasks" :isActive="appState.edit" @click="toggleEdit" />
    </menu>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStateStore } from '@/stores/appStateStore'
import { useTasksStore } from '@/stores/tasksStore'
import ListSwitcherButton from './ListSwitcherButton'
import TaskEditButton from './TaskEditButton'

const appState = useAppStateStore()
const tasks = useTasksStore()

const hasTasks = computed(() => tasks.from(appState.list).length > 0)

function switchList() {
    appState.edit = false
    appState.list = appState.nextList
}

function toggleEdit() {
    appState.edit = !appState.edit
}
</script>

<style scoped>
menu {
    height: var(--item-height);
    margin: 0 0 3px;
    padding: 0;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--b-low);
    border-radius: var(--border-radius);
    overflow: hidden;
}
</style>
