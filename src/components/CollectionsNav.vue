<template>
    <nav class="collections">
        <RouterLink
            class="collection-item"
            v-for="collection in tasksStore.collections"
            :class="[{ active: tasksStore.collection === collection.id }]"
            :key="collection.id"
            :to="`/collections/${collection.id}`"
        >{{ collection.id }}</RouterLink>
        <button class="collection-item" @click="tasksStore.createCollection()">
            <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 20 20"><path fill="currentColor" d="M11 9V4H9v5H4v2h5v5h2v-5h5V9z"/></svg>
        </button>
    </nav>
</template>

<script setup>
import { useTasks } from '@/stores/tasks'

const tasksStore = useTasks()
</script>

<style scoped>
.collections {
    display: flex;
    justify-content: flex-start;
    gap: 3px;
    width: fit-content;
    max-width: 100%;
    padding-top: 3px;
    padding-bottom: 3px;
    margin-bottom: 80px;
    background-color: var(--background);
}

.collection-item {
    height: var(--item-height-small);
    width: var(--item-height);
    padding: 0;
    margin: 0;
    color: transparent;
    background-color: var(--b-low);
    border-radius: var(--border-radius-small);
    transition: background-color var(--transition);
    overflow: hidden;
}

.collection-item.active {
    background-color: var(--f-med);
    cursor: default;
}

.collection-item:hover {
    background-color: var(--b-med);
}

a.collection-item {
    display: block;
}

a:active.collection-item {
    background-color: var(--b-med-alt);
}

button.collection-item {
    border: none;
}

button.collection-item svg {
    height: var(--item-height-small);
    width: var(--item-height-small);
    color: var(--f-low);
}

button.collection-item:active svg {
    color: var(--f-med);
}
</style>
