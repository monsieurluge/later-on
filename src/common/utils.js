export const not = fn => (...args) => !fn(...args)

export const thisMorning = new Date().setHours(0, 0, 1)

export const randomString = length => [...Array(length)].map(() => Math.random().toString(36)[2]).join('')

export const moveOldTaskToList = list => task => {
    if (task.list === list) return task
    if (task.lastUpdated > thisMorning) return task
    return {
        ...task,
        lastUpdated: Date.now(),
        list,
    }
}

export const previouslyFinishedTask = task => task.done === true && task.lastUpdated < thisMorning

export const todayFirst = (a, b) => {
    if (a.list === b.list) return 0
    return a.list === 'today' ? -1 : 1
}
