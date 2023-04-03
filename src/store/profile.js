// import axios from 'axios'
import { defineStore, acceptHMRUpdate } from 'pinia'
import apolloClient from "@/plugins/apollo"
import gql from 'graphql-tag'
import { GET_PROFILE_THREADS } from '@/store/helpers/thread'

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
        name
        image
      }
      following {
        name
        image
      }
    }
  }
`

const GET_FOLLOWERS = gql`
  query($feedId: ID!) {
    getProfile(id: $feedId) {
      followers {
        id
        name
        image
        description
        ssbURI
      }
    }
  }
`

const GET_FOLLOWING = gql`
  query($feedId: ID!) {
    getProfile(id: $feedId) {
      following {
        id
        name
        image
        description
        ssbURI
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
    activeProfile: null,
    threads: null
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
      this.threads = null
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
    },
    /**
     * Fetches the threads from user with a particular feedId
     */
    async loadProfileThreads () {
      const res = await apolloClient.query({
        query: GET_PROFILE_THREADS,
        variables: {
          feedId: this.activeProfile.id,
          cursor: null,
          limit: 10
        }
      })

      if (res.errors) throw res.errors

      this.$patch((state) => {
        state.threads = res.data.getThreads
      })
    },
    async loadMoreProfileThreads () {
      // use the last item as the cursor
      const cursor = (this.threads.slice(-1)[0])?.id
      const res = await apolloClient.query({
        query: GET_PROFILE_THREADS,
        variables: {
          feedId: this.activeProfile.id,
          cursor,
          limit: 10
        }
      })

      if (res.errors) throw res.errors

      // add them to the set
      this.$patch((state) => {
        state.threads = [...state.threads, ...res.data.getThreads]
      })
    },
    async getFollowers (id) {
      const res = await apolloClient.query({
        query: GET_FOLLOWERS,
        variables: {
          feedId: id
        }
      })

      if (res.errors) throw res.errors

      return res.data.getProfile.followers
    },
    async getFollowing (id) {
      const res = await apolloClient.query({
        query: GET_FOLLOWING,
        variables: {
          feedId: id
        }
      })

      if (res.errors) throw res.errors

      return res.data.getProfile.following
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
}