<template>
    <menu>
        <div class="content-wrapper" :class="{ hidden: appStateStore.isTaskDragging }">
            <FullSizeButton bold left :label="list" @click="switchList" />
            <ul class="list-actions">
                <li v-if="!appStateStore.isEdit">
                    <ActionButton class="action-button"><ItemIcon which="remove" /></ActionButton>
                </li>
                <li :class="{ visible: appStateStore.isEdit }">
                    <ActionButton v-if="hasTasks" class="action-button" :toggled="appStateStore.isEdit" @click="toggleEdit">
                        <ItemIcon which="edit" />
                    </ActionButton>
                </li>
            </ul>
        </div>
        <div class="content-wrapper" :class="{ hidden: !appStateStore.isTaskDragging }">
            <p ref="next-list" class="task-drop-zone" :class="{ target: isOverNextList }">{{ nextListLabel }}</p>
            <div ref="remove-task" class="task-drop-zone remove-task-drop-zone" :class="{ target: isOverRemove }">
                <ItemIcon which="remove" />
            </div>
        </div>
    </menu>
</template>

<script setup>
import { computed, useTemplateRef } from 'vue'
import { useAppState } from '@/stores/appState'
import { useTasks } from '@/stores/tasks'
import { useTaskDropZone } from '@/composables/taskDropZone'
import ActionButton from './ActionButton'
import FullSizeButton from './FullSizeButton'
import ItemIcon from './ItemIcon'

defineProps({
    list: { type: String, required: true },
})

const appStateStore = useAppState()
const tasksStore = useTasks()

const { isOver: isOverNextList } = useTaskDropZone({
    name: 'next list',
    onDrop: ({ name }) => tasksStore.moveToNextList(name),
    target: useTemplateRef('next-list'),
})

const { isOver: isOverRemove } = useTaskDropZone({
    name: 'remove task',
    onDrop: ({ name }) => tasksStore.remove(name),
    target: useTemplateRef('remove-task'),
})

const hasTasks = computed(() => {
    const list = tasksStore.list === 'today' ? tasksStore.fromToday : tasksStore.fromTomorrow
    return list.length > 0
})

const nextListLabel = computed(() => (tasksStore.nextList === 'today' ? '→ to today' : '→ later on'))

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
    position: relative;
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

.list-actions {
    position: absolute;
    right: 3px;
    top: 0;
    height: var(--item-height);
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3px;
    list-style-type: none;
}

.list-actions li {
    display: none;
}

.list-actions li.visible {
    display: unset;
}

.content-wrapper:hover li {
    display: unset;
}

.task-drop-zone {
    flex: 1;
    min-width: var(--item-height);
    height: var(--item-height);
    color: var(--f-high);
    font-family: monospace, sans;
    font-size: 1rem;
    line-height: var(--item-height);
    text-align: center;
    background-color: var(--b-low);
    transition:
        color var(--transition),
        background-color var(--transition);
}

.task-drop-zone.target {
    color: var(--f-high);
    background-color: var(--b-med);
}

.remove-task-drop-zone {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
