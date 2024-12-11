<template>
    <RouterLink class="collection-item" ref="drop-zone" :class="classObject" :to="`/collections/${id}`">
        <ItemIcon v-if="todayCount > 0" which="fullcircle" small />
        <ItemIcon v-if="todayCount === 0 && tomorrowCount > 0" which="circle" small />
        <svg v-if="total === 0" class="done" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path fill="currentColor" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9z" />
        </svg>
    </RouterLink>
</template>

<script setup>
import { computed, ref, useTemplateRef, watch } from 'vue'
import { useAppState } from '@/stores/appState'
import { useTasks } from '@/stores/tasks'
import { useTaskDropZone } from '@/composables/taskDropZone'
import ItemIcon from './ItemIcon'

const props = defineProps({
    id: { type: String, required: true },
    todayCount: { type: Number, required: true },
    tomorrowCount: { type: Number, required: true },
    total: { type: Number, required: true },
})

const appStore = useAppState()
const dropZone = useTemplateRef('drop-zone')
const tasksStore = useTasks()
const isDropTarget = ref(false)
const { isOver } = useTaskDropZone({
    name: 'collection item',
    onDrop: ({ name }) => tasksStore.toCollection({ collection: props.id, name }),
    target: dropZone,
})

watch(isOver, value => (isDropTarget.value = value))

const classObject = computed(() => ({
    active: tasksStore.collection === props.id,
    expanded: appStore.isTaskDragging,
    target: isDropTarget.value,
}))
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
