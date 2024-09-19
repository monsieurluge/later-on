import { ClientSideStorage } from '@/common/ClientSideStorage'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const sizes = new Map()
sizes.set('size', { next: 'small' })
sizes.set('small', { next: 'medium' })
sizes.set('medium', { next: 'large' })
sizes.set('large', { next: 'size' })

export const useTasksStore = defineStore('tasks', () => {
    const storage = new ClientSideStorage('later-on')
    const tasks = ref(storage.load())

    function add(name) {
        const trimmedName = name.trim()
        if (trimmedName.length === 0) return
        const found = tasks.value.find((task) => task.name === trimmedName)
        if (found) return
        tasks.value.push({
            done: false,
            name: trimmedName,
            size: 'size',
        })
        storage.save(tasks.value)
    }

    function changeSize(name) {
        const task = tasks.value.find((task) => task.name === name)
        if (!task) return
        if (!sizes.has(task.size)) return
        task.size = sizes.get(task.size).next
        storage.save(tasks.value)
    }

    function moveAfter(name, target) {
        if (name === target) return
        const task = tasks.value.find((task) => task.name === name)
        const index = tasks.value.indexOf(task)
        tasks.value.splice(index, 1)
        const position = tasks.value.findIndex((task) => task.name === target) + 1
        tasks.value.splice(position, 0, task)
        storage.save(tasks.value)
    }

    function moveOnTop(name) {
        const task = tasks.value.find((task) => task.name === name)
        const index = tasks.value.indexOf(task)
        tasks.value.splice(index, 1)
        tasks.value.unshift(task)
        storage.save(tasks.value)
    }

    function toggleCompletion(name) {
        const task = tasks.value.find((task) => task.name === name)
        if (!task) return
        task.done = !task.done
        storage.save(tasks.value)
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
