<template>
    <div v-if="config.edit" class="list-item"></div>
    <form
        v-else
        @dragleave="isDropTarget = false"
        @dragover.prevent="isDropTarget = true"
        @drop="onDrop"
        @submit.prevent="onSubmit"
    >
        <input
            class="list-item"
            placeholder="+ add a task"
            type="text"
            v-model="name"
            @blur="name = ''"
            @input.prevent
        />
        <div v-if="isDropTarget" class="dummy-item"></div>
    </form>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useTasksStore } from '@/stores/tasksStore'

const config = useConfigStore()
const isDropTarget = ref(false)
const name = ref('')
const props = defineProps(['listName'])
const tasks = useTasksStore()

function onDrop(event) {
    tasks.moveOnTop(event.dataTransfer.getData('taskName'))
    isDropTarget.value = false
}

function onSubmit() {
    tasks.add({ name: name.value, list: props.listName })
    name.value = ''
}
</script>

<style scoped>
.list-item {
    width: 100%;
    height: var(--item-height);
    padding: 0 10px;
    font-size: 1em;
    font-family: monospace, sans;
    background-color: var(--b-low);
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
    transition: background-color var(--transition);
}

div.list-item {
    height: var(--item-height-small);
    border-radius: var(--border-radius-small);
}

input:hover,
input:focus {
    background-color: var(--b-med);
}

input::placeholder {
    color: var(--f-low);
    transition: color var(--transition);
}

input:hover::placeholder {
    color: var(--f-high);
}

.dummy-item {
    height: 3px;
    margin-top: 3px;
    background-color: var(--b-med);
    border-radius: 1px;
}
</style>
