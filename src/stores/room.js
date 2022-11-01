import { defineStore, acceptHMRUpdate } from 'pinia'

export const useRoomStore = defineStore({
  id: 'room',
  state: () => ({
  }),
  getters: {
  },
  actions: {
    /**
     * Fetches a profile
     * @param {string} id
     */
    // async getProfile (id) {
    //   // this.currentProfile = profile

    //   const res = await apolloClient.query({
    //     query: GET_PROFILE,
    //     variables: {
    //       id
    //     }
    //   })
  
    //   if (res.errors) {
    //     console.error(res.errors) // TODO
    //     return
    //   }

    //   return res.data.getProfile
    // }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
}