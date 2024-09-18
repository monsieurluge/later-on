import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref([])

    const sizes = new Map()
    sizes.set('size', { next: 'small' })
    sizes.set('small', { next: 'medium' })
    sizes.set('medium', { next: 'large' })
    sizes.set('large', { next: 'size' })

    function add(name) {
        const found = tasks.value.find(task => task.name === name)
        if (found) return
        tasks.value.push({
            done: false,
            name,
            size: 'size',
        })
    }

    function changeSize(name) {
        const task = tasks.value.find(task => task.name === name)
        if (!task) return
        if (!sizes.has(task.size)) return
        task.size = sizes.get(task.size).next
    }

    function toggleCompletion(name) {
        const task = tasks.value.find(task => task.name === name)
        if (!task) return
        task.done = !task.done
    }

    return {
        add,
        changeSize,
        tasks,
        toggleCompletion,
    }
})
