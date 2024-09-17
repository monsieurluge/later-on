import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref([])

    function add(name) {
        const found = tasks.value.find(task => task.name === name)
        if (found) return
        tasks.value.push({
            name,
            done: false,
        })
    }

    function toggleCompletion(name) {
        const task = tasks.value.find(task => task.name === name)
        if (!task) return
        task.done = !task.done
    }

    return {
        add,
        tasks,
        toggleCompletion,
    }
})
