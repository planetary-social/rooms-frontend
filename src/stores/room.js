import gql from 'graphql-tag'
import apolloClient from "@/plugins/apollo"
import { defineStore, acceptHMRUpdate } from 'pinia'

const GET_MY_ROOM = gql`
  query {
    room: getMyRoom {
      name
      description
      multiaddress

      members {
        id
        name
        image
        description
      }
    }
  }
`

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
    activeRoom: null
  }),
  getters: {
  },
  actions: {
    /**
     * Fetches the room from the graphql server
     * @param {string} id
     */
    async loadRoom () {
      const res = await apolloClient.query({ query: GET_MY_ROOM })

      if (res.errors) throw res.errors

      this.activeRoom = res.data.room

      return this.activeRoom
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoomStore, import.meta.hot))
}