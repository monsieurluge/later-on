<template>
    <menu>
        <ListMenuButton
            class="menu-button"
            label="today"
            v-show="current === 'today'"
            @click="$emit('today-clicked')"
            @dragenter.prevent.stop
            @dragover.prevent.stop
            @drop.prevent="onDrop($event, 'tomorrow')"
        />
        <ListMenuButton
            class="menu-button"
            label="tomorrow"
            v-show="current === 'tomorrow'"
            @click="$emit('tomorrow-clicked')"
            @dragenter.prevent.stop
            @dragover.prevent.stop
            @drop="onDrop($event, 'today')"
        />
        <ListMenuEditButton
            :isActive="config.edit"
            @click="config.edit = !config.edit"
        />
    </menu>
</template>

<script setup>
import { defineProps } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useTasksStore } from '@/stores/tasksStore'
import ListMenuButton from './ListMenuButton'
import ListMenuEditButton from './ListMenuEditButton'

defineProps(['current'])

const config = useConfigStore()
const tasks = useTasksStore()

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
    gap: 1px;
    justify-content: space-between;
    border-radius: var(--border-radius);
    overflow: hidden;
}

.menu-button {
    flex: 1;
}
</style>
