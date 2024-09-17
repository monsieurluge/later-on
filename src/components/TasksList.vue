<template>
    <section class="tasks-list">
        <h2>today</h2>
        <form @submit.prevent="addTask">
            <input type="text" placeholder="+ add a task" v-model="name" />
        </form>
        <ul>
            <li
                v-for="task in store.tasks"
                :key="task.name"
                :class="{ done : task.done }"
                @click="() => store.toggleCompletion(task.name)"
            >{{ task.name }}</li>
        </ul>
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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    margin: 0 auto;
}

form {
    width: 100%;
    margin-bottom: 10px;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 1em;
    font-family: monospace, sans;
    border: 1px solid transparent;
    border-radius: 5px;
    box-sizing: border-box;
}

input:hover,
input:focus {
    border-color: #ccc;
}

ul {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
}

li {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 1em;
    font-family: monospace, sans;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    box-sizing: border-box;
}

.done {
    text-decoration: line-through;
}
</style>
