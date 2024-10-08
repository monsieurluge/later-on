<template>
    <menu>
        <ListMenuButton
            class="menu-button"
            label="today"
            v-show="current === 'today'"
            @click="$emit('today-clicked')"
            @dragenter.prevent.stop
            @dragover.prevent.stop="onDayDragOver"
            @drop.prevent="onDrop($event, 'tomorrow')"
        />
        <ListMenuButton
            class="menu-button"
            label="tomorrow"
            v-show="current === 'tomorrow'"
            @click="$emit('tomorrow-clicked')"
            @dragenter.prevent.stop
            @dragover.prevent.stop="onDayDragOver"
            @drop="onDrop($event, 'today')"
        />
        <ListMenuEditButton
            class="action-button"
            v-if="tasks.from(current).length > 0"
            :isActive="config.edit"
            @click="config.edit = !config.edit"
        />
    </menu>
</template>

<script setup>
import { defineProps } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useDragDropStore } from '@/stores/dragDropStore'
import { useTasksStore } from '@/stores/tasksStore'
import ListMenuButton from './ListMenuButton'
import ListMenuEditButton from './ListMenuEditButton'

defineProps(['current'])

const config = useConfigStore()
const dragDrop = useDragDropStore()
const tasks = useTasksStore()

function onDayDragOver() {
    dragDrop.lastDropTarget = 'day-switcher'
}

function onDrop(event, toList) {
    tasks.moveTo({
        list: toList,
        name: event.dataTransfer.getData('taskName'),
    })
}
</script>

<style scoped>
menu {
    margin: 0 0 3px;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 1px;
    justify-content: space-between;
    border-radius: var(--border-radius);
    background-color: var(--b-low);
    overflow: hidden;
    transition: background-color var(--transition);
}

menu:hover {
    background-color: var(--b-low-alt);
}

.menu-button {
    flex: 1;
}

.action-button {
    margin: 0 8px;
}
</style>
