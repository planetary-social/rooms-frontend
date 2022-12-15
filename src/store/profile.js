// import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import apolloClient from "@/plugins/apollo"
import gql from 'graphql-tag'

// TODO: extract these helpers into a lib
// TODO: create a minimal profile fragment
const GET_MINIMAL_PROFILE = gql`
  query ($id: ID!) {
    profile: getProfile (id: $id) {
      id
      name
      image
      description
      ssbURI
    }
  }
`

const GET_MINIMAL_PROFILE_BY_ALIAS = gql`
  query ($alias: String!) {
    profile: getProfileByAlias (alias: $alias) {
      id
      name
      image
      description
      ssbURI
    }
  }
`

const GET_PROFILE = gql`
  query ($id: ID!) {
    profile: getProfile (id: $id) {
      id
      name
      image
      description
      ssbURI
      aliases
      followersCount
      followingCount
      followers {
        id
        name
        image
        description
        ssbURI
      }
      following {
        id
        name
        image
        description
        ssbURI
      }
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

async function getProfileQuery (query, variables) {
  const res = await apolloClient.query({ query, variables })

  if (res.errors) throw res.errors

  return res.data.profile
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
    // helpers for mutating state
    setActiveProfile (profile) {
      this.activeProfile = profile
    },
  
    // helpers for getting profiles from graphql
    async getMinimalProfile (id) {
      return getProfileQuery(GET_MINIMAL_PROFILE, { id })
    },
    async getMinimalProfileByAlias (alias) {
      return getProfileQuery(GET_MINIMAL_PROFILE_BY_ALIAS, { alias })
    },
    async getProfile (id) {
      return getProfileQuery(GET_PROFILE, { id })
    },

    // helpers getting profiles from graphql AND loading them into the state
    async loadMinimalProfile (id) {
      if (!id) return
        
      const profile = await this.getMinimalProfile(id)
      this.setActiveProfile(profile)

      return profile
    },
    async loadMinimalProfileByAlias (alias) {
      if (!alias) return

      const profile = await this.getMinimalProfileByAlias(alias)
      this.setActiveProfile(profile)

      return profile
    },
    async loadProfile (id) {
      if (!id) return

      const profile = await this.getProfile(id)
      this.setActiveProfile(profile)

      return profile
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
}