<template>
    <section class="tasks-lists" @dragover="onDragover">
        <div class="separator top-separator"></div>
        <TheListsMenu/>
        <TasksList list-name="today" v-show="appState.list === 'today'" />
        <TasksList list-name="tomorrow" v-show="appState.list === 'tomorrow'" />
        <div class="separator bottom-separator"></div>
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
    width: var(--tasks-list-width);
    height: calc(100% - var(--header-height));
    margin: 0 auto;
    display: flex;
    flex-direction: column;
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

.top-separator {
    height: 56px;
    margin: 10px 0 10px 3px;
}

.bottom-separator {
    flex: 1;
    min-height: 60px;
    margin: 10px 0 0 3px;
}
</style>
