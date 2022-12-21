import { createApp } from 'vue'
import pinia from '@/store'

// apollo
import { DefaultApolloClient } from '@vue/apollo-composable'

import apolloClient from '@/plugins/apollo'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

import posthogPlugin from "./plugins/posthog"

// css
import "quasar/dist/quasar.sass"

const app = createApp(App)
app.provide(DefaultApolloClient, apolloClient)

app.use(pinia)
app.use(Quasar, quasarUserOptions)
app.use(router)
app.use(posthogPlugin)


router.isReady().then(() => {
  app.mount('#app')
})
