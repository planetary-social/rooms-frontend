import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'

// TODO dont hardcode the port
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API || 'http://localhost:4000/graphql'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

export default apolloClient
