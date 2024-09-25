<template>
    <form
        @dragleave="isDropTarget = false"
        @dragover.prevent="isDropTarget = true"
        @drop="onDrop"
        @submit.prevent="onSubmit"
    >
        <input type="text" placeholder="+ add a task" v-model="name" @blur="name = ''" />
        <div v-if="isDropTarget" class="dummy-item"></div>
    </form>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

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
input {
    width: 100%;
    padding: 10px;
    font-size: 1em;
    font-family: monospace, sans;
    background-color: var(--b-low);
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
    transition: background-color var(--transition);
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
