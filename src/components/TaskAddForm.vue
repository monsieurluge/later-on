<template>
    <div class="dummy-element" v-if="appState.isEdit || appState.isTaskDragging"></div>
    <form v-else :class="{ full: isInputFocused }" @submit.prevent="onSubmit">
        <input
            placeholder="+ add a task"
            type="text"
            v-model="name"
            @blur="resetState"
            @focusin="isInputFocused = true"
            @input.prevent
        />
    </form>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import { useAppStateStore } from '@/stores/appStateStore'

const appState = useAppStateStore()
const emit = defineEmits(['taskSubmitted'])
const isInputFocused = ref(false)
const name = ref('')

function onSubmit() {
    emit('taskSubmitted', name.value)
    name.value = ''
}

function resetState() {
    isInputFocused.value = false
    name.value = ''
}
</script>

<style scoped>
form {
    width: 100%;
    min-height: var(--item-height-small);
    max-height: var(--item-height-small);
    background-color: var(--b-med);
    border-radius: var(--border-radius-small);
    overflow: hidden;
    transition:
        min-height var(--transition),
        max-height var(--transition),
        background-color var(--transition),
        border-radius var(--transition),
}

form:hover,
form.full {
    min-height: var(--item-height);
    max-height: var(--item-height);
    border-radius: var(--border-radius);
}

input {
    display: none;
    width: 100%;
    height: var(--item-height);
    padding: 0 10px;
    color: var(--f-high);
    font-family: monospace, sans;
    font-size: 1em;
    line-height: var(--item-height);
    background-color: transparent;
    border: none;
    box-sizing: border-box;
}

input::placeholder {
    color: var(--f-high);
    opacity: 0.5;
}

form:hover input,
form.full input {
    display: unset;
}

input:hover,
input:focus {
    height: var(--item-height);
}

.dummy-element {
    width: 100%;
    height: var(--item-height-small);
    background-color: var(--b-low);
    border-radius: var(--border-radius-small);
}
</style>
