import { createRouter, createWebHistory } from 'vue-router'
import ProfilePage from '@/pages/ProfilePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '', redirect: '/profile' },
    
    { path: '/:catchAll(.*)', redirect: '/profile' },

    {
      path: '/profile/:feedId?',
      name: 'profile',
      component: ProfilePage
    }
  ]
})

export default router
