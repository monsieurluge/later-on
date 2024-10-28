<template>
    <AppHeader />
    <main>
        <RouterView />
    </main>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
    name: 'App',
    components: { AppHeader },
}
</script>

<style>
#app {
    height: 100%;
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
