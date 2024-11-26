<template>
    <menu>
        <div class="content-wrapper" :class="{ hidden: appStateStore.isTaskDragging }">
            <ListSwitcherButton :label="list" @click="switchList" />
            <TaskEditButton v-if="hasTasks" :isActive="appStateStore.isEdit" @click="toggleEdit" />
        </div>
        <div class="content-wrapper" :class="{ hidden: !appStateStore.isTaskDragging }">
            <ToNextListTaskDropZone :label="nextListLabel" @task-dropped="moveTask" />
            <RemoveTaskDropZone @task-dropped="removeTask" />
        </div>
    </menu>
</template>

<script setup>
import { computed } from 'vue'
import { useAppState } from '@/stores/appState'
import { useTasks } from '@/stores/tasks'
import ListSwitcherButton from './ListSwitcherButton'
import ToNextListTaskDropZone from './ToNextListTaskDropZone'
import TaskEditButton from './TaskEditButton'
import RemoveTaskDropZone from './RemoveTaskDropZone'

const appStateStore = useAppState()
const tasksStore = useTasks()

defineProps({
    list: { type: String, required: true },
})

const hasTasks = computed(() => {
    const list = tasksStore.list === 'today' ? tasksStore.fromToday : tasksStore.fromTomorrow
    return list.length > 0
})
const nextListLabel = computed(() => tasksStore.nextList === 'today' ? '→ to today' : '→ later on')

function moveTask(name) {
    tasksStore.moveToNextList(name)
}

function removeTask(name) {
    tasksStore.remove(name)
}

function switchList() {
    appStateStore.toState('idle')
    tasksStore.toNextList()
}

function toggleEdit() {
    appStateStore.toggleEdit()
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
