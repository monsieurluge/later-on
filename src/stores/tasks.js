import { defineStore } from 'pinia'
import { taskSizes } from '@/common/taskSizes'
import { moveOldTaskToList, not, previouslyFinishedTask, randomString, todayFirst } from '@/common/utils'

export const useTasks = defineStore('tasks', {
    state: () => ({
        collection: 'default',
        collections: [{ id: 'default', permanent: true }],
        list: 'today',
        tasks: [],
    }),
    persist: ['collection', 'collections', 'tasks'],
    getters: {
        fromToday: state => state.tasks.filter(task => task.list === 'today' && task.collection === state.collection),
        fromTomorrow: state => state.tasks.filter(task => task.list === 'tomorrow' && task.collection === state.collection),
        nextList: state => (state.list === 'today' ? 'tomorrow' : 'today'),
        collectionsInfos: state => state.collections.map(collection => {
            const todayCount = state.tasks.filter(task => task.list === 'today' && !task.done && task.collection === collection.id).length
            const tomorrowCount = state.tasks.filter(task => task.list === 'tomorrow' && !task.done && task.collection === collection.id).length
            return {
                id: collection.id,
                todayCount,
                tomorrowCount,
                total: todayCount + tomorrowCount,
            }
        })
    },
    actions: {
        add({ name, list }) {
            const trimmedName = name.trim()
            if (trimmedName.length === 0) return
            const taskExists = this.tasks.find(task => task.name === trimmedName)
            if (taskExists) return
            this.tasks.push({
                collection: this.collection,
                done: false,
                lastUpdated: Date.now(),
                list,
                name: trimmedName,
                size: 'none',
            })
        },
        changeSize(name) {
            const task = this.tasks.find(task => task.name === name)
            if (!task) return
            task.size = taskSizes.get(task.size).next
            task.lastUpdated = Date.now()
        },
        createCollection() {
            const id = randomString(8)
            this.collections.push({
                id,
                permanent: false,
            })
            this.collection = id
        },
        fetchTasks() {
            this.tasks = this.tasks
                .map(task => ({ collection: 'default', ...task })) // TEMPORARY
                .filter(not(previouslyFinishedTask)) // remove finished tasks from past days only
                .sort(todayFirst) // sort tasks by list without touching their order in each list
                .map(moveOldTaskToList('today')) // move old "tomorrow" tasks to "today"
        },
        moveAfter({ name, target }) {
            if (name === target) return
            const task = this.tasks.find(task => task.name === name)
            const index = this.tasks.indexOf(task)
            this.tasks.splice(index, 1)
            const position = this.tasks.findIndex(task => task.name === target) + 1
            this.tasks.splice(position, 0, task)
            task.lastUpdated = Date.now()
        },
        moveBefore({ name, target }) {
            if (name === target) return
            const task = this.tasks.find(task => task.name === name)
            const index = this.tasks.indexOf(task)
            this.tasks.splice(index, 1)
            const position = this.tasks.findIndex(task => task.name === target)
            this.tasks.splice(position, 0, task)
            task.lastUpdated = Date.now()
        },
        moveToNextList(name) {
            const task = this.tasks.find(task => task.name === name)
            if (!task) return
            task.list = task.list === 'today' ? 'tomorrow' : 'today'
            task.lastUpdated = Date.now()
            const index = this.tasks.indexOf(task)
            this.tasks.splice(index, 1)
            this.tasks.push(task)
        },
        remove(name) {
            const task = this.tasks.find(task => task.name === name)
            if (!task) return
            const index = this.tasks.indexOf(task)
            this.tasks.splice(index, 1)
        },
        removeCurrentCollection() {
            if (this.collection === 'default') return
            this.tasks.filter(task => task.collection === this.collection).forEach(task => this.remove(task.name))
            this.collections = this.collections.filter(collection => collection.id !== this.collection)
            this.collection = 'default'
        },
        rename({ newName, oldName }) {
            const task = this.tasks.find(task => task.name === oldName)
            if (!task) return
            const trimmedName = newName.trim()
            if (trimmedName.length === 0) return
            const taskExists = this.tasks.find(task => task.name === trimmedName)
            if (taskExists) return
            task.lastUpdated = Date.now()
            task.name = trimmedName
        },
        setCurrentCollection(id) {
            if (!this.collections.find(collection => collection.id === id)) return
            this.collection = id
        },
        toggleCompletion(name) {
            const task = this.tasks.find(task => task.name === name)
            if (!task) return
            task.done = !task.done
            task.lastUpdated = Date.now()
        },
        toCollection({ collection, name }) {
            const task = this.tasks.find(task => task.name === name)
            task.collection = collection
            task.list = 'today'
        },
        toNextList() {
            this.list = this.nextList
        },
        toNewCollection(name) {
            this.createCollection()
            const collection = this.collections.slice(-1)[0].id
            this.toCollection({ collection, name })
        },
        toState(newState) {
            this.state = newState
        },
        toToday() {
            this.list = 'today'
        },
    },
})
