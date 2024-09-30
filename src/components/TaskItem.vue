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
        </template>
        <template v-else>
            <span class="name" :title="name">{{ name }}</span>
            <button :title="size" @click.prevent.stop="changeSize">
                <template v-if="size === 'none'"><span class="empty all-empty">▫▫▫</span></template>
                <template v-if="size === 'small'"><span class="empty">▫▫</span>▪</template>
                <template v-if="size === 'medium'"><span class="empty">▫</span>▪▪</template>
                <template v-if="size === 'large'">▪▪▪</template>
            </button>
        </template>
    </li>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const props = defineProps(['done', 'editable', 'name', 'size'])

const newName = ref('')
const tasks = useTasksStore()

function changeSize() {
    tasks.changeSize(props.name)
}

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
    background-color: var(--b-low);
    border: none;
    border-radius: 5px;
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
    height: 100%;
    border: none;
    background-color: transparent;
}

input.error {
    color: var(--f-inv);
    background-color: var(--b-inv);
}

.done:not(.editable) .name {
    text-decoration: line-through;
}

button {
    height: 100%;
    padding: 3px;
    color: var(--f-low);
    font-family: monospace, sans;
    text-orientation: sideways;
    writing-mode: vertical-lr;
    background-color: var(--b-low);
    border: none;
    border-left: 1px solid var(--b-low);
    border-radius: 0 5px 5px 0;
    box-sizing: border-box;
    transition:
        background-color var(--transition),
        color var(--transition);
}

.empty {
    color: var(--f-low);
    transition: color var(--transition);
}

.all-empty {
    color: transparent;
}

li:hover button {
    background-color: var(--b-med);
}

button:hover {
    color: var(--f-high);
}

li:hover .all-empty {
    color: var(--f-low);
}

button:hover .all-empty {
    color: var(--f-high);
}
</style>
