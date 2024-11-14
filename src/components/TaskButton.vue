<template>
    <button :title="title" @click.prevent.stop="$emit('clicked')">
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({
    title: { type: String, default: ''},
})
</script>

<style scoped>
button {
    height: var(--item-button-size);
    width: var(--item-button-size);
    display: flex;
    justify-content: center;
    align-items: center;
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
    background-color: var(--b-med);
}

button:active {
    color: var(--f-med);
}
</style>
