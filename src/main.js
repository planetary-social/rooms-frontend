import { createApp } from 'vue'
import { createPinia } from 'pinia'

// apollo
import { DefaultApolloClient } from '@vue/apollo-composable'

import apolloClient from '@/plugins/apollo'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

import "quasar/dist/quasar.sass"

const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(createPinia())
app.use(router)
app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
