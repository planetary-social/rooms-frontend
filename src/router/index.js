import pinia from "@/store"
// import { useRoomStore } from "@/store/room"
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import ModalContainer from '@/components/modal/ModalContainer.vue'
import { useProfileStore } from "../store/profile"
// import NotFoundPage from '@/pages/NotFoundPage.vue'
// import Redirect from '@/components/Redirect.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_DIR),
  routes: [
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
      component: ProfilePage,

    },
    {
      path: '/follow/:feedId(.*)?',
      name: 'follow',
      component: ProfilePage,
      async beforeEnter(to, from, next) {
        // NOTE: this is a bit hacky, but because Planetary currently doesnt support
        // ssb-uris, we will just use this one for now.
        var feedId = to.params?.feedId

        if (feedId?.endsWith('/')) {
          feedId = feedId.slice(0, -1)

          const profileStore = useProfileStore(pinia)
          const profile = await profileStore.getMinimalProfile(feedId)
          
          // redirect if a profile was found
          if (profile?.ssbURI) {
            window.location.href = profile.ssbURI
          }
        }

        next()
      },
    },
    { path: '/:catchAll(.*)', redirect: '/' }
  ]
})

export default router
