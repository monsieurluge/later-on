<template>
    <li :class="{ done, editable }" @click="onTaskClicked">
        <template v-if="editable">
            <input
                class="name"
                type="text"
                placeholder="remove the task ?"
                :value="name"
                @focusin="onNameChange"
                @input="onNameChange"
                @blur="submit"
                @keyup.enter="submit"
            />
            <button class="dimmed" @click.prevent.stop="$emit('removeButtonClicked')">del</button>
        </template>
        <template v-else>
            <span class="name" :title="name">{{ name }}</span>
            <button :class="{ dimmed: size === 'size' }" @click.prevent.stop="$emit('sizeButtonClicked')">{{ size }}</button>
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
    if (newName.value.length === 0) {
        tasks.remove(props.name)
        return
    }
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
    transition: background-color 0.3s;
}

li:hover {
    background-color: var(--b-med);
}

.name {
    width: 100%;
    padding: 0 10px;
    color: var(--f-high);
    font-size: 1em;
    font-family: monospace, sans;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

input.name {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
}

input.error {
    color: white;
    background-color: crimson;
}

.done:not(.editable) .name {
    text-decoration: line-through;
}

button {
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

button.dimmed {
    color: var(--b-low);
}

li:hover button.dimmed {
    color: var(--f-low);
}

button:hover,
li:hover button:hover {
    color: var(--f-high);
}
</style>
