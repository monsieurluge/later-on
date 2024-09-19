<template>
    <section class="tasks-lists">
        <div class="separator top-separator"></div>
        <TheListsSwitcher
            :current="currentList"
            @today-clicked="currentList = 'today'"
            @tomorrow-clicked="currentList = 'tomorrow'"
        />
        <TasksList list-name="today" v-show="currentList === 'today'" />
        <TasksList list-name="tomorrow" v-show="currentList === 'tomorrow'" />
        <div class="separator bottom-separator"></div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import TasksList from './TasksList.vue'
import TheListsSwitcher from './TheListsSwitcher.vue'

const currentList = ref('today')
</script>

<style scoped>
.tasks-lists {
    width: 400px;
    height: calc(100% - var(--header-height));
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}

.separator {
    --dot-bg: var(--background);
    --dot-color: var(--f-low);
    --dot-size: 2px;
    --dot-space: 10px;
    background-color: var(--background);
    background:
        linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space)
            var(--dot-space),
        linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
        var(--dot-color);
}

.top-separator {
    height: 56px;
    margin: 10px 0 10px 3px;
}

.bottom-separator {
    flex: 1;
    min-height: 60px;
    margin: 10px 0 0 3px;
}
</style>
