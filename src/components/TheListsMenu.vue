<template>
    <menu>
        <div class="content-wrapper" :class="{ hidden: appState.isTaskDragging }">
            <ListSwitcherButton :label="list" @click="switchList" />
            <TaskEditButton v-if="hasTasks" :isActive="appState.isEdit" @click="toggleEdit" />
        </div>
        <div class="content-wrapper" :class="{ hidden: !appState.isTaskDragging }">
            <ToNextListTaskDropZone :label="nextListLabel" @task-dropped="moveTask" />
            <RemoveTaskDropZone @task-dropped="removeTask" />
        </div>
    </menu>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStateStore } from '@/stores/appStateStore'
import { useTasksStore } from '@/stores/tasksStore'
import ListSwitcherButton from './ListSwitcherButton'
import ToNextListTaskDropZone from './ToNextListTaskDropZone'
import TaskEditButton from './TaskEditButton'
import RemoveTaskDropZone from './RemoveTaskDropZone'

const appState = useAppStateStore()
const router = useRouter()
const tasks = useTasksStore()

defineProps({
    list: { type: String, required: true },
})

const hasTasks = computed(() => tasks.from(appState.list).length > 0)
const nextListLabel = computed(() => appState.nextList === 'today' ? '→ to today' : '→ later on')

function moveTask(name) {
    tasks.moveToNextList(name)
}

function removeTask(name) {
    tasks.remove(name)
}

function switchList() {
    appState.state = 'idle'
    appState.list = appState.nextList
    router.push({ name: appState.list === 'today' ? 'today' : 'tomorrow' })
}

function toggleEdit() {
    appState.state = appState.isEdit ? 'idle' : 'edit'
}
</script>

<style scoped>
menu {
    margin: 0 0 3px;
    padding: 0;
    flex-shrink: 0;
    border-radius: var(--border-radius);
    overflow: hidden;
}

.content-wrapper {
    height: var(--item-height);
    display: flex;
    align-items: center;
    gap: 1px;
    justify-content: space-between;
    overflow: hidden;
    opacity: 1;
    transition:
        height var(--transition),
        background-color var(--transition),
        opacity var(--transition);
}

.hidden {
    height: 0;
    opacity: 0;
}
</style>
