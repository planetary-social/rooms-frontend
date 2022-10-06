import { defineStore } from 'pinia'
import apolloClient from "@/plugins/apollo"
import gql from 'graphql-tag'

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

const GET_BLOB_URI = gql`
  query ($blobId: String!) {
    getBlobUri (blobId: $blobId)
  }
`

async function getProfile (id) {
  return apolloClient.query({
    query: GET_PROFILE,
    variables: {
      id
    }
  })
}

async function getBlobUri (blobId) {
  return apolloClient.query({
    query: GET_BLOB_URI,
    variables: {
      blobId
    }
  })
}

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

      const res = await getProfile(id)
      if (res.errors) {
        console.error(res.errors) // TODO
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
    },

    async getBlobUri (blobId) {
      if (!blobId) return

      const res = await getBlobUri(blobId)
      if (res.errors) {
        console.error(res.errors)
        return
      }

      return res.data.getBlobUri
    }
  }
})

// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
// }