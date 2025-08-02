<template>
<li class="task-item">
    <input
        placeholder="remove the task ?"
        type="text"
        :value="name"
        @blur="onSubmit"
        @focusin="onNameChange"
        @input="onNameChange"
        @keyup.enter="onSubmit"
    />
</li>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const props = defineProps({
    name: { type: String, required: true },
})

const newName = ref('')

function onNameChange(event) {
    newName.value = event.target.value
}

function onSubmit() {
    emit('submit', props.name, newName.value)
}
</script>

<style scoped>
.task-item {
    height: var(--item-height);
    width: 100%;
    background-color: var(--b-low);
    border-radius: 5px;
    box-sizing: border-box;
    transition: background-color 0.3s;
}

.task-item:hover {
    background-color: var(--b-low-alt);
}

input {
    width: 100%;
    padding: 0 10px;
    color: var(--f-high);
    font-size: 1em;
    font-family: monospace, sans;
    line-height: var(--item-height);
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: transparent;
    border: none;
    cursor: text;
    box-sizing: border-box;
}

input.error {
    color: var(--f-inv);
    background-color: var(--b-inv);
}
</style>
