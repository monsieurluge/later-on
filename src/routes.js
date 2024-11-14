import TasksPage from './pages/TasksPage/TasksPage.vue'

const routes = [
    {
        alias: '/today',
        component: TasksPage,
        path: '/',
        props: { list: 'today' },
    },
    {
        component: TasksPage,
        name: 'today',
        path: '/today',
        props: { list: 'today' },
    },
    {
        component: TasksPage,
        name: 'tomorrow',
        path: '/tomorrow',
        props: { list: 'tomorrow' },
    },
]

export default routes
