<template>
    <button :class="{ enabled: isActive }">edit</button>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps(['isActive'])
</script>

<style scoped>
button {
    height: fit-content;
    padding: 2px 10px;
    color: var(--f-low);
    font-family: monospace, sans;
    font-size: 0.8rem;
    text-align: center;
    border: none;
    border-radius: var(--border-radius-small);
    background-color: var(--b-low);
    cursor: default;
    transition:
        color var(--transition),
        background-color var(--transition),
        border-color var(--transition);
}

button:hover {
    color: var(--f-med);
}

button:active {
    color: var(--f-low);
}

button.enabled {
    color: var(--b-low);
    background-color: var(--f-med);
}

button.enabled:hover {
    color: var(--b-med);
}

button.enabled:active {
    color: var(--b-low);
}
</style>
