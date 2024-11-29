<template>
    <nav class="collections">
        <CollectionsNavLink v-for="collection in tasksStore.collectionsInfos" :key="collection.id" v-bind="collection" />
        <button @click="tasksStore.createCollection()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><g fill="currentColor"><path d="M5 11a1 1 0 1 1 0-2h10a1 1 0 1 1 0 2z"/><path d="M9 5a1 1 0 0 1 2 0v10a1 1 0 1 1-2 0z"/></g></svg>
        </button>
    </nav>
</template>

<script setup>
import { useTasks } from '@/stores/tasks'
import CollectionsNavLink from './CollectionsNavLink'

const tasksStore = useTasks()
</script>

<style scoped>
.collections {
    display: flex;
    justify-content: flex-start;
    gap: 3px;
    width: fit-content;
    height: var(--item-height-small);
    max-width: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    margin-bottom: 80px;
    background-color: var(--background);
    overflow: visible;
}

button {
    height: var(--item-height-small);
    width: var(--item-height);
    padding: 0;
    margin: 0;
    background-color: var(--b-low);
    border: none;
    border-radius: var(--border-radius-small);
    transition: background-color var(--transition);
    overflow: hidden;
}

button:hover {
    background-color: var(--b-med);
}

button svg {
    height: var(--item-height-small);
    width: var(--item-height-small);
    color: var(--f-low);
}

button:hover svg {
    color: var(--f-high);
}

button:active svg {
    color: var(--f-med);
}
</style>
