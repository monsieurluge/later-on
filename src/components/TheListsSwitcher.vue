<template>
    <menu>
        <button
            @click="$emit('today-clicked')"
            class="left-button"
            :class="{ active: current === 'today' }"
        >today</button>
        <button
            @click="$emit('tomorrow-clicked')"
            class="right-button"
            :class="{ active: current === 'tomorrow' }"
        >tomorrow</button>
    </menu>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps(['current'])
</script>

<style scoped>
menu {
    margin: 0 0 3px;
    padding: 0;
    display: flex;
    gap: 1px;
    justify-content: space-between;
}

button {
    padding: 10px;
    color: var(--b-low);
    font-family: monospace, sans;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    background-color: var(--b-low);
    cursor: default;
}

button.active {
    flex: 1;
    color: var(--f-high);
    font-weight: bold;
}

menu:hover button:not(.active) {
    color: var(--f-low);
}

menu:hover button:not(.active):hover {
    color: var(--f-high);
    background-color: var(--b-med);
    cursor: pointer;
}

.left-button {
    text-align: left;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.right-button {
    text-align: right;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
</style>
