import apolloClient from "@/plugins/apollo"
import { defineStore, acceptHMRUpdate } from 'pinia'

import { GET_MY_ROOM, GET_ROOM_INVITE_CODE } from "@/store/helpers/room"
import { GET_THREAD, GET_ROOM_THREADS } from '@/store/helpers/thread'

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
     * Fetches a single thread from a messageId
     */
    async loadThread (msgId) {
      const res = await apolloClient.query({ query: GET_THREAD, variables: { msgId } })
      if (res.errors) {
        console.error('Error loading a thread', res.errors)
        // TODO: graceful error handling
        return null
      }

      return res.data.getThread
    },
    /**
     * Fetches the threads from the members of the room and puts them
     * into the activeRoom state
     */
    async loadRoomThreads () {
      const res = await apolloClient.query({ query: GET_ROOM_THREADS, variables: { cursor: null, limit: 10 } })
      if (res.errors) throw res.errors

      this.$patch((state) => {
        state.threads = res.data.getThreads
      })
    },
    async loadMoreRoomThreads () {
      // use the last item as the cursor
      const cursor = (this.threads.slice(-1)[0])?.id
      const res = await apolloClient.query({ query: GET_ROOM_THREADS, variables: { cursor, limit: 10 }})
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