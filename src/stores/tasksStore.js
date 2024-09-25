import { taskSizes } from '@/common/taskSizes'
import { moveOldTaskToList, not, previouslyFinishedTask, todayFirst } from '@/common/utils'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
    const tasks = useLocalStorage('later-on', [])

    // initial setup
    tasks.value = tasks.value
        .filter(not(previouslyFinishedTask)) // remove finished tasks from past days only
        .sort(todayFirst) // sort tasks by list without touching their order in each list
        .map(moveOldTaskToList('today')) // move old "tomorrow" tasks to "today"

    function add({ name, list }) {
        const trimmedName = name.trim()
        if (trimmedName.length === 0) return
        const taskExists = tasks.value.find(task => task.name === trimmedName)
        if (taskExists) return
        tasks.value.push({
            done: false,
            lastUpdated: Date.now(),
            list,
            name: trimmedName,
            size: 'size',
        })
    }

    function changeSize(name) {
        const task = tasks.value.find(task => task.name === name)
        if (!task) return
        if (!taskSizes.has(task.size)) return
        task.size = taskSizes.get(task.size).next
        task.lastUpdated = Date.now()
    }

    function from(list) {
        return tasks.value.filter(task => task.list === list)
    }

    function moveAfter(name, target) {
        if (name === target) return
        const task = tasks.value.find(task => task.name === name)
        const index = tasks.value.indexOf(task)
        tasks.value.splice(index, 1)
        const position = tasks.value.findIndex(task => task.name === target) + 1
        tasks.value.splice(position, 0, task)
        task.lastUpdated = Date.now()
    }

    function moveOnTop(name) {
        const task = tasks.value.find(task => task.name === name)
        task.lastUpdated = Date.now()
        const index = tasks.value.indexOf(task)
        tasks.value.splice(index, 1)
        tasks.value.unshift(task)
    }

    function moveTo({ name, list }) {
        const task = tasks.value.find(task => task.name === name)
        if (!task) return
        task.list = list
        task.lastUpdated = Date.now()
        const index = tasks.value.indexOf(task)
        tasks.value.splice(index, 1)
        tasks.value.push(task)
    }

    function remove(name) {
        const task = tasks.value.find(task => task.name === name)
        if (!task) return
        const index = tasks.value.indexOf(task)
        tasks.value.splice(index, 1)
    }

    function rename({ newName, oldName }) {
        const task = tasks.value.find(task => task.name === oldName)
        if (!task) return
        const trimmedName = newName.trim()
        if (trimmedName.length === 0) return
        const taskExists = tasks.value.find(task => task.name === trimmedName)
        if (taskExists) return
        task.lastUpdated = Date.now()
        task.name = trimmedName
    }

    function toggleCompletion(name) {
        const task = tasks.value.find(task => task.name === name)
        if (!task) return
        task.done = !task.done
        task.lastUpdated = Date.now()
    }

    return {
        add,
        changeSize,
        from,
        moveAfter,
        moveOnTop,
        moveTo,
        rename,
        remove,
        tasks,
        toggleCompletion,
    }
})
