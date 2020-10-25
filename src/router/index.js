import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import TaskData from "@/views/TaskData";
import SubtaskData from "@/views/SubtaskData";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/settings',
        name: 'Settings',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
    },
    {
        path: '/create',
        name: 'Create',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "create" */ '../views/Create.vue')
    },
    {
        path: '/task/:id', component: TaskData,
        name: 'Task'

    },
    {
        path: '/task/:id/:nestedId', component: SubtaskData,
        name: 'Subtask'

    }
];

const router = new VueRouter({
    routes
});


export default router;
