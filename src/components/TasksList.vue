<template>
    <section class="tasks-list">
        <TaskAddForm :listName="listName" />
        <ul
            @dragend="onDragEnd"
            @dragenter.prevent.stop
            @dragover.prevent.stop
            @drop="onDrop"
        >
            <TaskItemDummy v-if="tasksList.length === 0" label="take a coffee, then add some tasks" />
            <template v-for="task in tasksList" :key="task.name">
                <TaskItemDummy v-if="dragDrop.lastDropTarget === 'task' && dropTargetItem.name === task.name && dropTargetItem.position === 'top'" />
                <TaskItem
                    :done="task.done"
                    :name="task.name"
                    :size="task.size"
                    :working="currentTaskName === task.name"
                    @dragOverTop="onDragOverTop"
                    @dragOverBottom="onDragOverBottom"
                />
                <TaskItemDummy v-if="dragDrop.lastDropTarget === 'task' && dropTargetItem.name === task.name && dropTargetItem.position === 'bottom'" />
            </template>
        </ul>
    </section>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'
import { useDragDropStore } from '@/stores/dragDropStore'
import { useTasksStore } from '@/stores/tasksStore'
import TaskAddForm from './TaskAddForm'
import TaskItem from './TaskItem'
import TaskItemDummy from  './TaskItemDummy'

const dragDrop = useDragDropStore()
const fakeDropTargetItem = { name: '', position: 'none' }
const dropTargetItem = ref(fakeDropTargetItem)
const props = defineProps(['listName'])
const tasks = useTasksStore()

const currentTaskName = computed(() => {
    const workingOn = tasks.tasks.filter(({ list }) => list === 'today').find(({ done }) => !done)
    return workingOn ? workingOn.name : ''
})

const tasksList = computed(() => tasks.from(props.listName))

function onDragEnd() {
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

function onDrop(event) {
    const task = event.dataTransfer.getData('taskName')
    if (!task) {
        dropTargetItem.value = fakeDropTargetItem
        return
    }
    event.preventDefault()
    event.stopPropagation()
    if (dropTargetItem.value.position === 'top') {
        tasks.moveBefore(event.dataTransfer.getData('taskName'), dropTargetItem.value.name)
    }
    if (dropTargetItem.value.position === 'bottom') {
        tasks.moveAfter(event.dataTransfer.getData('taskName'), dropTargetItem.value.name)
    }
    dropTargetItem.value = fakeDropTargetItem
}
</script>

<style scoped>
ul {
    width: 100%;
    margin: 3px 0 0 0;
    padding: 0;
    list-style: none;
}
</style>
