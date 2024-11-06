<template>
    <button :title="size">
        <template v-if="size === 'none'"><span class="empty all-empty">▫▫▫</span></template>
        <template v-if="size === 'small'"><span class="empty">▫▫</span>▪</template>
        <template v-if="size === 'medium'"><span class="empty">▫</span>▪▪</template>
        <template v-if="size === 'large'">▪▪▪</template>
    </button>
</template>

<script setup>
defineProps({
    size: {
        type: String,
        required: true,
        validator: (value) => ['none', 'small', 'medium', 'large'].includes(value)
    },
})
</script>

<style scoped>
button {
    height: var(--item-button-size);
    width: var(--item-button-size);
    color: var(--f-low);
    font-family: monospace, sans;
    line-height: var(--item-button-size);
    text-orientation: sideways;
    writing-mode: vertical-lr;
    background-color: transparent;
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
    transition:
        background-color var(--transition),
        border-color var(--transition),
        color var(--transition);
}

button:hover {
    background-color: var(--b-med);
}
</style>
