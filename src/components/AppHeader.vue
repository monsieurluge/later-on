<template>
<header>
    <h1>later on</h1><button @click="toggleThemeEditor">theme editor</button>
</header>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppState } from '@/stores/appState'

const appStateStore = useAppState()

onMounted(() => {
    appStateStore.isThemeEditorVisible ? window.displayThemeEditor() : window.hideThemeEditor()
})

function toggleThemeEditor() {
    appStateStore.toggleThemeEditor()
    appStateStore.isThemeEditorVisible ? window.displayThemeEditor() : window.hideThemeEditor()
}
</script>

<style scoped>
header {
    height: var(--header-height);
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--b-low);
}

h1 {
    margin: 0 0 0 1.4rem;
    color: var(--f-high);
    font-family: vintage, sans-serif;
    font-size: 1.4rem;
    line-height: 60px;
}

button {
    height: 1.4rem;
    margin-left: 1em;
    padding-left: 1em;
    padding-right: 1em;
    color: var(--f-low);
    background-color: transparent;
    border: none;
    border-radius: var(--border-radius);
    transition:
        background var(--transition),
        color var(--transition);
}

button:hover {
    color: var(--f-high);
    background-color: var(--b-med);
}

button:active {
    color: var(--f-med);
}
</style>
