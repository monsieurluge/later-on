<template>
    <menu>
        <ListSwitcherButton
            :current="appState.list"
            @click="switchList"
            @taskDropped="onTaskDropped"
        />
        <TaskEditButton
            v-if="hasTasks"
            :isActive="appState.edit"
            @click="toggleEdit"
        />
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
const nextList = computed(() => appState.list === 'today' ? 'tomorrow' : 'today')

function onTaskDropped(name) {
    tasks.moveTo({
        list: nextList.value,
        name: name,
    })
}

function switchList() {
    appState.edit = false
    appState.list = nextList.value
}

function toggleEdit() {
    appState.edit = !appState.edit
}
</script>

<style scoped>
menu {
    margin: 0 0 3px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: var(--border-radius);
    background-color: var(--b-low);
    overflow: hidden;
    transition: background-color var(--transition);
}
</style>
