import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import ReleaseView from './views/ReleaseView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/release/:id',
    name: 'Release',
    component: ReleaseView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router