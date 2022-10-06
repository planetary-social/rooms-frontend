import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'

// TODO dont hardcode the port
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

export default apolloClient