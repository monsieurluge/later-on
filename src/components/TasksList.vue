<template>
    <section class="tasks-list">
        <h2>today</h2>
        <form @submit.prevent="addTask">
            <input type="text" placeholder="+ add a task" v-model="name" />
        </form>
        <ul>
            <li
                v-for="(task, index) in tasks"
                :key="index"
                :class="{ done : task.done }"
                @click="() => toggleCompletion(index)"
            >{{ task.name }}</li>
        </ul>
    </section>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const tasks = ref([])

function addTask() {
    if (name.value.length === 0) return
    tasks.value.push({
        name: name.value,
        done: false,
    })
    name.value = ''
}

function toggleCompletion(index) {
    tasks.value[index].done = !tasks.value[index].done
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
