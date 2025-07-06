import { createWebHistory, createRouter } from 'vue-router'

import HomePage from './pages/Home.vue'
import ServerUpdatePage from './pages/ServerUpdate.vue'
import ServerCreatePage from './pages/ServerCreate.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/server/:id/update',
    name: 'update-server',
    component: ServerUpdatePage,
  },
  {
    path: '/server/create',
    name: 'create-server',
    component: ServerCreatePage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router