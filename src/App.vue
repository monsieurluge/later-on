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
    width: var(--main-width);
    height: calc(100% - var(--header-height));
    margin: 0 auto;
    padding-top: 80px;

    --dot-bg: var(--background);
    --dot-color: var(--b-low);
    --dot-size: 2px;
    --dot-space: 10px;
    background-color: var(--background);
    background:
        linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space)
            var(--dot-space),
        linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
        var(--dot-color);
}
</style>
