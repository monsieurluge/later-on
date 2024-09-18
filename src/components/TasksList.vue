<template>
    <section class="tasks-list">
        <div class="separator top-separator"></div>
        <h2>today</h2>
        <form @submit.prevent="addTask">
            <input type="text" placeholder="+ add a task" v-model="name" />
        </form>
        <ul v-show="store.tasks.length > 0">
            <li
                v-for="task in store.tasks"
                :key="task.name"
                :class="{ done : task.done }"
                @click="() => store.toggleCompletion(task.name)"
            >{{ task.name }}</li>
        </ul>
        <div class="separator bottom-separator"></div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'

const name = ref('')
const store = useTasksStore()

function addTask() {
    if (name.value.length === 0) return
    store.add(name.value)
    name.value = ''
}
</script>

<style scoped>
section {
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
		linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
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

h2 {
    margin: 0 0 3px;
    padding: 10px;
    font-size: 1rem;
    font-family: monospace, sans;
    background-color: var(--b-low);
    border-radius: 5px;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 1em;
    font-family: monospace, sans;
    background-color: var(--b-low);
    border: none;
    border-radius: 5px;
    box-sizing: border-box;
}

input:hover,
input:focus {
    background-color: var(--b-med);
}

ul {
    width: 100%;
    margin: 3px 0 0 0;
    padding: 0;
    list-style: none;
}

li {
    width: 100%;
    padding: 10px;
    font-size: 1em;
    font-family: monospace, sans;
    background-color: var(--b-low);
    border-radius: 5px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    box-sizing: border-box;
    transition: background-color 0.3s;
}

li:not(:last-child) {
    margin-bottom: 3px;
}

li:hover {
    background-color: var(--b-med);
}

.done {
    text-decoration: line-through;
}
</style>
