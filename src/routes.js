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
    {
        // when no route is found or valid, display the tasks list page
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
]

export default routes
