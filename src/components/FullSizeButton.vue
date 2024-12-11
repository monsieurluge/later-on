<template>
    <button :class="{ bold, left }">{{ label }}</button>
</template>

<script setup>
defineProps({
    bold: { type: [Boolean, String] },
    label: { type: String, required: true },
    left: { type: [Boolean, String] },
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
    text-align: center;
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

.bold {
    font-weight: bold;
}

.left {
    text-align: left;
}
</style>
