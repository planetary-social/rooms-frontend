import { createApp } from 'vue'
import { createPinia } from 'pinia'

// apollo
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

import "quasar/dist/quasar.sass"

// TODO dont hardcode the port
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

const app = createApp(App)

app.use(Quasar, quasarUserOptions)
app.use(createPinia())
app.use(router)
app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
