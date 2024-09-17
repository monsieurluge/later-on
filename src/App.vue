<template>
    <header>
        <h1>later on</h1>
    </header>
    <TasksList />
</template>

<script>
import TasksList from './components/TasksList.vue'

export default {
    name: 'App',
    components: { TasksList },
}
</script>

<style>
#app {}

header {
    height: 60px;
    margin-bottom: 60px;
    background-color: #f0f0f0;
}

h1 {
    margin: 0 0 0 1.4rem;
    color: #2c3e50;
    font-size: 1.4rem;
    font-weight: lighter;
    line-height: 60px;
}
</style>
