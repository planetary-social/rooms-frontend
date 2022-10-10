import { defineStore } from 'pinia'
import apolloClient from "@/plugins/apollo"
import gql from 'graphql-tag'

const GET_MINIMAL_PROFILE = gql`
  query ($id: ID!) {
    getProfile (id: $id) {
      id
      name
    }
  }
`

// TODO: extract these helpers into a lib
const GET_PROFILE = gql`
  query ($id: ID!) {
    getProfile (id: $id) {
      id
      name
      threads {
        id
        messages {
          id
          text
          timestamp
          author {
            id
            image
            name
          }
          votes {
            expression
            author {
              id
              image
              name
            }
          }
        }
      }
    }
  }
`

export const useProfileStore = defineStore({
  id: 'profile',
  state: () => ({
    activeProfile: null
  }),
  getters: {
    /**
     * @returns {Object<{ id: string; name: string }>}
     */
     getActiveProfile: (state) => state.activeProfile
  },
  actions: {
    /**
     * Fetches a profile
     * @param {string} id
     */
    async getProfile (id) {
      // this.currentProfile = profile

      const res = await apolloClient.query({
        query: GET_PROFILE,
        variables: {
          id
        }
      })
  
      if (res.errors) {
        console.error(res.errors) // TODO
        return
      }

      return res.data.getProfile
    },

    async getMinimalProfile (id) {
      const res = await apolloClient.query({
        query: GET_MINIMAL_PROFILE,
        variables: { id }
      })

      if (res.errors) {
        console.error(res.errors)
        return
      }

      return res.data.getProfile
    },

    async loadProfile (id) {
      if (!id) return

      const profile = await this.getProfile(id)
      if (profile) {
        this.activeProfile = profile
      }
    }
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
// }