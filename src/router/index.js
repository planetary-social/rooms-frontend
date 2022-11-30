import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import ModalContainer from '@/components/modal/ModalContainer.vue'
// import NotFoundPage from '@/pages/NotFoundPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_DIR),
  routes: [
    // {
    //   path: '/',
    //   component: HomePage,
    //   children: [{
    //     name: 'dialog',
    //     path: 'join',
    //     component: ModalContainer,
    //     props: true
    //   }]
    // },
    {
      path: '/',
      children: [{
        path: '/',
        components: {
          default: HomePage,
          dialog: ModalContainer
        }
      }]
    },
    {
      path: '/profile/alias/:alias',
      name: 'alias',
      component: ProfilePage
    },
    {
      path: '/profile/:feedId(.*)?',
      name: 'profile',
      component: ProfilePage
    },
    { path: '/:catchAll(.*)', redirect: '/' }
  ]
})

export default router
