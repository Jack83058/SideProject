import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Components from '@/pages/Components'
import Typography from '@/pages/Typography'
import Maps from '@/pages/Maps'
import Video from '@/pages/Video'
import Image from '@/pages/Image'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: { name: 'About' },
        component: Home
    },
    {
        path: '/components',
        name: 'Components',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Components
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: About
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/map',
        name: 'Map',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Maps
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/video',
        name: 'Video',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Video
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/image',
        name: 'Image',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Image
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },

    {
        path: '/typography',
        name: 'Typography',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Typography
        // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
