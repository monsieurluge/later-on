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

    function moveAfter(name, target) {
        if (name === target) return
        const task = tasks.value.find(task => task.name === name)
        const index = tasks.value.indexOf(task)
        tasks.value.splice(index, 1)
        const position = tasks.value.findIndex(task => task.name === target) + 1
        tasks.value.splice(position, 0, task)
    }

    function moveOnTop(name) {
        const task = tasks.value.find(task => task.name === name)
        const index = tasks.value.indexOf(task)
        tasks.value.splice(index, 1)
        tasks.value.unshift(task)
    }

    function toggleCompletion(name) {
        const task = tasks.value.find(task => task.name === name)
        if (!task) return
        task.done = !task.done
    }

    return {
        add,
        changeSize,
        moveAfter,
        moveOnTop,
        tasks,
        toggleCompletion,
    }
})
