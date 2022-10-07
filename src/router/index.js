import { createRouter, createWebHistory } from 'vue-router'
import ProfilePage from '@/pages/ProfilePage.vue'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '', redirect: '/home' },
    { path: '/home', name: 'home', component: HomePage },
    { path: '/:catchAll(.*)', redirect: '/home' },
    { path: '/profile/:feedId?', name: 'profile', component: ProfilePage },
  ]
})

export default router
