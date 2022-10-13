import { createRouter, createWebHistory } from 'vue-router'
import ProfilePage from '@/pages/ProfilePage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_DIR),
  routes: [
    { path: '', redirect: '/profile' },
    {
      path: '/profile/:feedId?',
      name: 'profile',
      component: ProfilePage
    },
    { path: '/profile/:feedId(.*)', component: ProfilePage },
    { path: '/:catchAll(.*)', component: NotFoundPage }
  ]
})

export default router
