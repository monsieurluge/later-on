<template>
    <button :class="{ enabled: isActive }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="1rem" height="1rem"><path fill="currentColor" d="m16.77 8l1.94-2a1 1 0 0 0 0-1.41l-3.34-3.3a1 1 0 0 0-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96l-4.75-4.75z"/></svg>
    </button>
</template>

<script setup>
defineProps({
    isActive: { type: [Boolean, String], default: false }
})
</script>

<style scoped>
button {
    width: var(--item-height);
    height: var(--item-height);
    color: var(--f-low);
    border: none;
    background-color: var(--b-low);
    transition:
        color var(--transition),
        background-color var(--transition);
}

button:hover {
    background-color: var(--b-med);
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

svg {
    display: inline-block;
    vertical-align: middle;
    aspect-ratio: 1 / 1;
    height: 1.2rem;
    fill: currentColor;
}
</style>
