<template>
    <button :title="title" :class="{ toggled }" @click.prevent.stop="$emit('clicked')">
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({
    toggled: { type: [Boolean, String] },
    title: { type: String, default: ''},
})
</script>

<style scoped>
button {
    height: var(--item-button-size);
    width: var(--item-button-size);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--f-low);
    font-family: monospace, sans;
    font-size: 0.8rem;
    line-height: var(--item-button-size);
    background-color: var(--b-low);
    border: none;
    border-radius: var(--border-radius-small);
    box-sizing: border-box;
    overflow: hidden;
    transition:
        background-color var(--transition),
        color var(--transition);
}

button:hover {
    color: var(--f-high);
    background-color: var(--b-med);
}

button:active {
    color: var(--f-med);
}

button.toggled {
    color: var(--b-low);
    background-color: var(--f-med);
}

button.toggled:hover {
    color: var(--b-med);
}

button.toggled:active {
    color: var(--b-low);
}
</style>
