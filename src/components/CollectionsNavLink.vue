<template>
    <RouterLink
        class="collection-item"
        :class="classObject"
        :to="`/collections/${id}`"
        @dragleave="onDragLeave"
        @dragover.prevent.stop="onDragOver"
        @drop="onDrop"
    >
        <svg v-if="todayCount > 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" d="M16.5 10a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0"/></svg>
        <svg v-if="todayCount === 0 && tomorrowCount > 0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M10 5.5a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9M3.5 10a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0" clip-rule="evenodd"/></svg>
        <svg v-if="total === 0" class="done" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9z"/></svg>
    </RouterLink>
</template>

<script setup>
import { computed, ref } from 'vue'
import { isStringDragEvent } from '@/common/dragAndDrop'
import { useAppState } from '@/stores/appState'
import { useTasks } from '@/stores/tasks'

const props = defineProps({
    id: { type: String, required: true },
    todayCount: { type: Number, required: true },
    tomorrowCount: { type: Number, required: true },
    total: { type: Number, required: true },
})

const appStore = useAppState()
const tasksStore = useTasks()
const isDropTarget = ref(false)

const classObject = computed(() => ({
    active: tasksStore.collection === props.id,
    expanded: appStore.isTaskDragging,
    target: isDropTarget.value,
}))

function onDragLeave() {
    isDropTarget.value = false
}

function onDragOver(event) {
    if (!isStringDragEvent(event)) return
    event.preventDefault()
    event.stopPropagation()
    appStore.setDropTarget('collection item')
    isDropTarget.value = true
}

function onDrop(event) {
    isDropTarget.value = false
    const task = event.dataTransfer.getData('taskName')
    if (!task) return
    event.preventDefault()
    event.stopPropagation()
    tasksStore.toCollection({
        collection: props.id,
        name: task,
    })
}
</script>

<style scoped>
.collection-item {
    max-height: var(--item-height-small);
    min-height: var(--item-height-small);
    width: var(--item-height);
    padding: 0;
    margin: 0;
    color: var(--f-low);
    font-size: var(--item-height-small);
    line-height: var(--item-height-small);
    text-align: center;
    text-decoration: none;
    background-color: var(--b-low);
    border-radius: var(--border-radius-small);
    transition:
        background-color var(--transition),
        border-radius var(--transition),
        line-height var(--transition),
        max-height var(--transition),
        min-height var(--transition);
    overflow: hidden;
}

svg {
    height: var(--item-height-small);
    width: var(--item-height-small);
}

.done {
    color: var(--b-low);
}

.collection-item:not(.active):hover {
    color: var(--f-high);
    background-color: var(--b-med);
}

.collection-item:hover .done {
    color: var(--f-high);
}

.active,
.active .done {
    color: var(--background);
    background-color: var(--f-med);
}

.collection-item:not(.active):active,
.collection-item:active .done {
    color: var(--f-med);
}

.hoverable-icon {
    width: 100%;
    height: 100%;
}

.hoverable-icon > :nth-child(2) {
    display: none;
}

.hoverable-icon:hover > :nth-child(1) {
    display: none;
}

.hoverable-icon:hover > :nth-child(2) {
    display: initial;
}

.expanded {
    max-height: var(--item-height);
    min-height: var(--item-height);
    line-height: var(--item-height);
    border-radius: var(--border-radius);
}

.target {
    background-color: var(--b-med);
}
</style>
