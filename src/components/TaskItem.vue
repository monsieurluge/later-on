<template>
    <li :class="{ done }" @click="$emit('clicked')">
        <span class="name">{{ name }}</span>
        <button
            class="size-button"
            :class="size"
            @click.prevent.stop="$emit('sizeButtonClicked')"
        >{{ size }}</button>
    </li>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps([ 'done', 'name', 'size' ])
</script>

<style scoped>
li {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 10px;
    justify-content: space-between;
    font-size: 1em;
    font-family: monospace, sans;
    background-color: var(--b-low);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-sizing: border-box;
    transition: background-color 0.3s;
}

li.next {
    border-left: 3px solid var(--f-med);
}

li:hover {
    background-color: var(--b-med);
}

li .name {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.done .name {
    text-decoration: line-through;
}

.size-button {
    color: var(--f-low);
    font-family: monospace, sans;
    font-size: 0.8em;
    background-color: var(--b-low);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-sizing: border-box;
    transition: background-color 0.3s, color 0.3s;
}

.size-button.size {
    color: var(--b-low);
}

li:hover .size-button.size {
    color: var(--f-low);
}

.size-button:hover {
    color: var(--f-high);
}
</style>
