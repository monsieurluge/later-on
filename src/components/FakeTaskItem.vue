<template>
    <li>{{ label }}</li>
</template>

<script setup>
    defineProps({
        label: { type: String, required: true },
    })
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
    background-color: var(--b-low);
    border-radius: var(--border-radius);
}

li:not(:last-child) {
    margin-bottom: 3px;
}
</style>
