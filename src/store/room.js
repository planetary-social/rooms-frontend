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
    },
    /**
     * Fetchs an invite code for them
     */
    async getInviteCode () {
      const res = await apolloClient.query({ query: GET_ROOM_INVITE_CODE })
      if (res.errors) throw res.errors

      return res.data.inviteCode
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoomStore, import.meta.hot))
}