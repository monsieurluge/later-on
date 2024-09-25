<template>
    <header>
        <h1>later on</h1>
    </header>
    <TheTasksLists />
</template>

<script>
import TheTasksLists from './components/TheTasksLists.vue'

export default {
    name: 'App',
    components: { TheTasksLists },
}
</script>

<style>
#app {
    height: 100%;
}

header {
    height: 60px;
    background-color: var(--b-low);
}

h1 {
    margin: 0 0 0 1.4rem;
    color: var(--f-high);
    font-size: 1.4rem;
    font-weight: lighter;
    line-height: 60px;
}
</style>
