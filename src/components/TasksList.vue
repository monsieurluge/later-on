<template>
    <section class="tasks-list">
        <TaskAddForm :listName="listName" />
        <ul
            id="tasks-list"
            @dragend="onDragEnd"
            @dragenter.prevent.stop
            @dragover.prevent.stop
            @drop.prevent.stop="onDrop"
        >
            <li v-if="tasksList.length === 0" class="default-item">take a coffee, then add some tasks</li>
            <template v-for="task in tasksList" :key="task.name">
                <li
                    v-if="dropTargetItem.name === task.name && dropTargetItem.position === 'top'"
                    class="dummy-item"
                ></li>
                <TaskItem
                    :done="task.done"
                    :name="task.name"
                    :size="task.size"
                    :working="currentTaskName === task.name"
                    @dragOverTop="onDragOverTop"
                    @dragOverBottom="onDragOverBottom"
                />
                <li
                    v-if="dropTargetItem.name === task.name && dropTargetItem.position === 'bottom'"
                    class="dummy-item"
                ></li>
            </template>
        </ul>
    </section>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import TaskAddForm from './TaskAddForm'
import TaskItem from './TaskItem'

const fakeDropTargetItem = { name: '', position: 'none' }
const props = defineProps(['listName'])
const tasks = useTasksStore()
const dropTargetItem = ref(fakeDropTargetItem)

const currentTaskName = computed(() => {
    const workingOn = tasks.tasks.filter(({ list }) => list === 'today').find(({ done }) => !done)
    return workingOn ? workingOn.name : ''
})

const tasksList = computed(() => tasks.from(props.listName))

function onDragEnd() {
    dropTargetItem.value = fakeDropTargetItem
}

function onDrop(event) {
    const task = event.dataTransfer.getData('taskName')
    if (!task) {
        dropTargetItem.value = fakeDropTargetItem
        return
    }
    if (dropTargetItem.value.position === 'top') {
        tasks.moveBefore(event.dataTransfer.getData('taskName'), dropTargetItem.value.name)
    }
    if (dropTargetItem.value.position === 'bottom') {
        tasks.moveAfter(event.dataTransfer.getData('taskName'), dropTargetItem.value.name)
    }
    dropTargetItem.value = fakeDropTargetItem
}

function onDragOverBottom(name) {
    dropTargetItem.value = {
        name,
        position: 'bottom',
    }
}

function onDragOverTop(name) {
    dropTargetItem.value = {
        name,
        position: 'top',
    }
}
</script>

<style scoped>
ul {
    width: 100%;
    margin: 3px 0 0 0;
    padding: 0;
    list-style: none;
}

.default-item {
    width: 100%;
    padding: 30px 10px;
    color: var(--f-high);
    font-size: 1em;
    font-family: monospace, sans;
    background-color: var(--b-low);
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
}

.dummy-item {
    margin: 3px 0 0;
    height: var(--item-height);
    background-color: var(--b-med);
    border-radius: var(--border-radius);
}

.dummy-item:not(:last-child) {
    margin-bottom: 3px;
}
</style>
