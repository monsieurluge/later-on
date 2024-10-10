<template>
    <section class="tasks-lists" @dragover="onDragover">
        <TheListsMenu/>
        <TasksList list-name="today" v-show="appState.list === 'today'" />
        <TasksList list-name="tomorrow" v-show="appState.list === 'tomorrow'" />
    </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStateStore } from '@/stores/appStateStore'
import { useDragDropStore } from '@/stores/dragDropStore'
import TasksList from './TasksList.vue'
import TheListsMenu from './TheListsMenu.vue'

const appState = useAppStateStore()
const dragDrop = useDragDropStore()

onMounted(() => {
    window.addEventListener('keyup', event => {
        if (event.code === 'Escape' && appState.edit) {
            appState.edit = false
        }
    })
})

function onDragover() {
    dragDrop.lastDropTarget = 'tasks-lists'
}
</script>

<style scoped>
.tasks-lists {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    background-color: var(--background);
}
</style>
