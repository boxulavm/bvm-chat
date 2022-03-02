import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Channels',
    name: 'Channels',
    // route level code-splitting
    // this generates a separate chunk (Channels.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Channels" */ '../views/Channels.vue')
  },
  {
    path: '/Channel',
    name: 'Channel',
    component: () => import('../views/Channel.vue')
  },
  { path: '/:notFound(.*)', component: Login}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
