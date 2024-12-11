<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" v-if="which === 'add'" :class="classList">
        <g fill="currentColor">
            <path d="M5 11a1 1 0 1 1 0-2h10a1 1 0 1 1 0 2z" />
            <path d="M9 5a1 1 0 0 1 2 0v10a1 1 0 1 1-2 0z" />
        </g>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" v-if="which === 'checkmark'" :class="classList">
        <path fill="currentColor" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9z"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" v-if="which === 'circle'" :class="classList">
        <path fill="currentColor" fill-rule="evenodd" d="M10 5.5a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9M3.5 10a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0" clip-rule="evenodd"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" v-if="which === 'edit'" :class="classList">
        <path fill="currentColor" d="m16.77 8l1.94-2a1 1 0 0 0 0-1.41l-3.34-3.3a1 1 0 0 0-1.41 0L12 3.23zM1 14.25V19h4.75l9.96-9.96l-4.75-4.75z" />
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" v-if="which === 'fullcircle'" :class="classList">
        <path fill="currentColor" d="M16.5 10a6.5 6.5 0 1 1-13 0a6.5 6.5 0 0 1 13 0"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" v-if="which === 'remove'" :class="classList">
        <path fill="currentColor" d="M17 2h-3.5l-1-1h-5l-1 1H3v2h14zM4 17a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5H4z" />
    </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    small: { type: [Boolean, String] },
    which: { required: true, type: String },
})

const classList = computed(() => ({
    small: props.small,
}))
</script>

<style scoped>
svg {
    aspect-ratio: 1 / 1;
    height: calc(var(--item-height) * 0.46);
    fill: currentColor;
    transition: fill var(--transition);
}

svg.small {
    height: var(--item-height-small);
}
</style>
