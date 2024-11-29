<template>
    <nav class="collections">
        <CollectionsNavLink v-for="collection in tasksStore.collectionsInfos" :key="collection.id" v-bind="collection" />
        <CollectionsNavAddButton @click="tasksStore.createCollection()" />
    </nav>
</template>

<script setup>
import { useTasks } from '@/stores/tasks'
import CollectionsNavLink from './CollectionsNavLink'
import CollectionsNavAddButton from './CollectionsNavAddButton'

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
</style>
