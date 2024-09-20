<template>
    <li :class="{ done, editable }" @click="onTaskClicked">
        <template v-if="editable">
            <input
                class="name"
                type="text"
                :value="name"
                @input="onNameChange"
                @blur="submit"
                @keyup.enter="submit"
            />
        </template>
        <template v-else>
            <span class="name">{{ name }}</span>
            <button class="size-button" :class="`${size}-value`" @click.prevent.stop="$emit('sizeButtonClicked')">{{ size }}</button>
        </template>
    </li>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const props = defineProps(['done', 'editable', 'name', 'size'])

const newName = ref('')
const tasks = useTasksStore()

function submit() {
    tasks.rename({ oldName: props.name, newName: newName.value })
}

function onNameChange(event) {
    newName.value = event.target.value
}

function onTaskClicked() {
    if (props.editable) return
    tasks.toggleCompletion(props.name)
}
</script>

<style scoped>
li {
    width: 100%;
    height: var(--item-height);
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    background-color: var(--b-low);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-sizing: border-box;
    overflow: hidden;
    transition: background-color 0.3s;
}

li:hover {
    background-color: var(--b-med);
}

.name {
    width: 100%;
    padding: 0 10px;
    font-size: 1em;
    font-family: monospace, sans;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

input.name {
    width: 100%;
    height: 100%;
    background-color: var(--b-low);
    border: none;
}

input.name:hover {
    background-color: var(--b-med);
}

input.error {
    color: white;
    background-color: crimson;
}

.done:not(.editable) .name {
    text-decoration: line-through;
}

.size-button {
    margin-right: 10px;
    color: var(--f-low);
    font-family: monospace, sans;
    font-size: 0.8em;
    background-color: var(--b-low);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-sizing: border-box;
    transition:
        background-color 0.3s,
        color 0.3s;
}

.size-button.size-value {
    color: var(--b-low);
}

li:hover .size-button.size-value {
    color: var(--f-low);
}

.size-button:hover,
li:hover .size-button:hover.size-value {
    color: var(--f-high);
}
</style>
