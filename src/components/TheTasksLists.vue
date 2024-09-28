<template>
    <section class="tasks-lists">
        <div class="separator top-separator"></div>
        <TheListsMenu
            :current="currentList"
            @dropped-on-today="currentList = 'today'"
            @dropped-on-tomorrow="currentList = 'tomorrow'"
            @today-clicked="currentList = 'tomorrow'"
            @tomorrow-clicked="currentList = 'today'"
        />
        <TasksList list-name="today" v-show="currentList === 'today'" />
        <TasksList list-name="tomorrow" v-show="currentList === 'tomorrow'" />
        <div class="separator bottom-separator"></div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TasksList from './TasksList.vue'
import { useConfigStore } from '@/stores/configStore'
import TheListsMenu from './TheListsMenu.vue'

const currentList = ref('today')
const config = useConfigStore()

onMounted(() => {
    window.addEventListener('keyup', event => {
        if (event.code === 'Escape' && config.edit) {
            config.edit = false
        }
    })
})
</script>

<style scoped>
.tasks-lists {
    width: var(--tasks-list-width);
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
