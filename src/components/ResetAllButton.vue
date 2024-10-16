<template>
    <button @click="reset">Click here when you're ready to clear all the demo content and start using the app !</button>
</template>

<script setup>
import { useAppStateStore } from '@/stores/appStateStore'
import { useTasksStore } from '@/stores/tasksStore'

const appState = useAppStateStore()
const tasks = useTasksStore()

function reset() {
    tasks.clear()
    appState.list = 'today'
    appState.isDemo = false
}
</script>

<style scoped>
button {
    width: 100%;
    margin-top: var(--item-height);
    padding: 10px;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: row;
    color: var(--f-high);
    font-size: 1em;
    font-family: monospace, sans;
    background-color: var(--b-low);
    border: 4px solid var(--b-low);
    border-radius: 5px;
    transition:
        color var(--transition),
        background-color var(--transition),
        border-color var(--transition);
}

button:hover {
    border-color: var(--b-inv);
}

button:active {
    color: var(--f-inv);
    background-color: var(--b-inv);
    border-color: var(--b-inv);
}
</style>
