import { createRouter, createWebHistory } from 'vue-router'
import TasksListPage from './pages/TasksListPage'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            alias: '/today',
            component: TasksListPage,
            path: '/',
            props: { list: 'today' },
        },
        {
            component: TasksListPage,
            name: 'today',
            path: '/today',
            props: { list: 'today' },
        },
        {
            component: TasksListPage,
            name: 'tomorrow',
            path: '/tomorrow',
            props: { list: 'tomorrow' },
        },
    ],
})

export default router
