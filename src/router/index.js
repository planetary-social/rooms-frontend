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
      path: '/alias/:alias',
      name: 'alias',
      component: ProfilePage
    },
    // {
    //   path: '/profile/:feedId(.*)',
    //   component: ProfilePage,
    //   alias: ['/alias', '/alias/:alias']
    // },
    { path: '/:catchAll(.*)', component: NotFoundPage }
  ]
})

export default router
