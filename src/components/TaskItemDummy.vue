<template>
    <li>{{ label }}</li>
</template>

<script setup>
    import { defineProps } from 'vue'

    defineProps(['label'])
</script>

<style scoped>
li {
    margin: 3px 0 0;
    height: var(--item-height);
    padding: 0 10px;
    color: var(--f-high);
    font-family: monospace, sans;
    font-size: 1em;
    line-height: var(--item-height);
    background-color: var(--b-med);
    border-radius: var(--border-radius);
}

li:not(:last-child) {
    margin-bottom: 3px;
}
</style>
