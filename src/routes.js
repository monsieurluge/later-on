import TasksPage from './pages/TasksPage.vue'

const routes = [
    {
        component: TasksPage,
        name: 'home',
        path: '/',
    },
    {
        component: TasksPage,
        name: 'collection',
        path: '/collections/:id',
    },
]

export default routes
