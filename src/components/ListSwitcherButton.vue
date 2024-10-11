<template>
    <button>{{ current }}</button>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
    current: { type: String, required: true },
})
</script>

<style scoped>
button {
    flex: 1;
    height: var(--item-height);
    padding: 10px;
    color: var(--f-high);
    font-family: monospace, sans;
    font-size: 1rem;
    font-weight: bold;
    text-align: left;
    border: none;
    background-color: var(--b-low);
    overflow: hidden;
    transition:
        color var(--transition),
        background-color var(--transition);
}

button:hover {
    background-color: var(--b-med);
}

button:active {
    color: var(--f-med);
}
</style>
