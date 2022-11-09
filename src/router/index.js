import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_DIR),
  routes: [
    { path: '/', component: HomePage },
    {
      path: '/profile/:feedId?',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/profile/alias/:alias',
      name: 'alias',
      component: ProfilePage
    },
    { path: '/:catchAll(.*)', component: NotFoundPage }
  ]
})

export default router
