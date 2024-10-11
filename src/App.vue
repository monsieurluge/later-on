<template>
    <header>
        <h1>later on</h1>
    </header>
    <main>
        <TheTasksLists />
    </main>
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
    height: var(--header-height);
    background-color: var(--b-low);
}

h1 {
    margin: 0 0 0 1.4rem;
    color: var(--f-high);
    font-size: 1.4rem;
    font-weight: lighter;
    line-height: 60px;
}

main {
    width: 100%;
    height: calc(100% - var(--header-height));
}
</style>
