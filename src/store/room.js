import gql from 'graphql-tag'
import apolloClient from "@/plugins/apollo"
import { defineStore, acceptHMRUpdate } from 'pinia'

const GET_MY_ROOM = gql`
  query {
    room: getMyRoom {
      name
      description
      multiaddress
      url

      members {
        id
        name
        image
        description
        ssbURI
      }
    }
  }
`

const GET_ROOM_INVITE_CODE = gql`
  query {
    inviteCode: getInviteCode
  }
`

const GET_ROOM_THREADS = gql`
  query($cursor: String) {
    getThreads(limit: 10, cursor: $cursor) {
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
`

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    activeRoom: null,
    threads: null
  }),
  // getters: {
  // },
  actions: {
    /**
     * Fetches the room from the graphql server
     * @param {string} id
     */
    async loadRoom () {
      const res = await apolloClient.query({ query: GET_MY_ROOM })

      if (res.errors) throw res.errors

      this.activeRoom = res.data.room

      // NOTE: we do this separately so it doesnt hold
      // up displaying information about the room
      await this.loadRoomThreads()

      return this.activeRoom
    },
    /**
     * Fetchs an invite code for them
     */
    async getInviteCode () {
      const res = await apolloClient.query({ query: GET_ROOM_INVITE_CODE })
      if (res.errors) throw res.errors

      return res.data.inviteCode
    },
    /**
     * Fetches the threads from the members of the room and puts them
     * into the activeRoom state
     */
    async loadRoomThreads () {
      const res = await apolloClient.query({ query: GET_ROOM_THREADS, variables: { cursor: null } })
      if (res.errors) throw res.errors

      this.$patch((state) => {
        state.threads = res.data.getThreads
      })
    },
    async loadMoreRoomThreads () {
      // use the last item as the cursor
      const cursor = (this.threads.slice(-1)[0])?.id
      const res = await apolloClient.query({ query: GET_ROOM_THREADS, variables: { cursor }})
      if (res.errors) throw res.errors

      // add them to the set
      this.$patch((state) => {
        state.threads = [...state.threads, ...res.data.getThreads]
      })
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoomStore, import.meta.hot))
}