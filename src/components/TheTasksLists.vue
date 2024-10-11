<template>
    <div id="tasks-lists">
        <DummyTaskDropZone />
        <div class="list-wrapper" @dragover.prevent.stop="onListDragOver" @dragenter.prevent.stop>
            <div class="separator separator-top"></div>
            <TheListsMenu />
            <TasksList list-name="today" v-show="appState.list === 'today'" />
            <TasksList list-name="tomorrow" v-show="appState.list === 'tomorrow'" />
            <div class="separator separator-bottom"></div>
        </div>
        <TaskDropZone :label="appState.nextList === 'today' ? '→ do it today' : '→ later on'" @task-dropped="onTaskDropped" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStateStore } from '@/stores/appStateStore'
import { useDragDropStore } from '@/stores/dragDropStore'
import { useTasksStore } from '@/stores/tasksStore'
import DummyTaskDropZone from './DummyTaskDropZone.vue'
import TaskDropZone from './TaskDropZone'
import TasksList from './TasksList.vue'
import TheListsMenu from './TheListsMenu'

const appState = useAppStateStore()
const dragDrop = useDragDropStore()
const tasks = useTasksStore()

onMounted(() => {
    window.addEventListener('keyup', event => {
        if (event.code === 'Escape' && appState.edit) {
            appState.edit = false
        }
    })
})

function onListDragOver() {
    dragDrop.lastDropTarget = 'tasks-lists'
}

function onTaskDropped(name) {
    tasks.moveToNextList(name)
}
</script>

<style scoped>
#tasks-lists {
    height: 100%;
    display: flex;
    flex-direction: row;
}

.list-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.separator {
    --dot-bg: var(--background);
    --dot-color: var(--b-low);
    --dot-size: 2px;
    --dot-space: 10px;
    background-color: var(--background);
    background:
        linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space)
            var(--dot-space),
        linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
        var(--dot-color);
}

.separator-top {
    height: 80px;
    margin-bottom: 10px;
}

.separator-bottom {
    flex: 1;
    min-height: 80px;
    margin-top: 10px;
}
</style>
