<template>
  <q-page class="full-width row justify-center" :style="columnStyle">
    <!-- TOP SEARCH BAR TO BE REMOVED -->
    <div v-if="activeRoom" class="justify-end">
      <RoomOverview class="sticky" :room="tempRoom" />
    </div>
    <div class="justify-start items-start" :style="columnStyle">
      <threads :threads="tempThreads"/>
    </div>
  </q-page>
</template>

<script>
  import { mapState, mapActions } from 'pinia'
  import { useRoomStore } from '@/stores/room'
  import { useProfileStore } from '@/stores/profile'

  // components
  import Threads from '@/components/Threads.vue'
  import RoomOverview from '@/components/RoomOverview.vue'
  import roomIcon from '@/assets/room.svg'
  
  const TEMP_DESCRIPTION = (name) => `
  Welcome to the ${name} SSB room server.\n
  \n
  🚧🛠 This server is a development server and is currently under construction 🛠🚧\n
  \n
  You can join this server by downloading [Planetary](https://apps.apple.com/us/app/planetary-app/id1481617318).\n
  \n
  In the app, navigate to Settings -> Manage Rooms (beta) -> where you will be able to paste an invite which you can generate on this rooms home page.\n
  \n
  To register an alias, in the app, navigate to Settings -> Aliases (beta) -> Register a new alias -> choose ${name}, enter your alias name and click Register.\n
  \n
  Known issues: \n
  - Sign in with SSB is not supported yet in Planetary, so you will not be able to sign into the room on the web.\n
  - Opening a room alias page on macOS will prompt you to open "Electron" which is not a valid SSB app.\n
  - Opening a room alias on an iOS device with Manyverse installed will not give you the option to open the profile in Planetary.\n
  `
  
  
  export default {
    components: {
      Threads,
      RoomOverview
    },
    data () {
      return {
        tempMembers: [],
        tempThreads: []
      }
    },
    async mounted () {
      await this.loadRoom()
      await this.loadTempMembers()
      // await this.loadTempThreads()
    },
    
    computed: {
      ...mapState(useRoomStore, ['activeRoom']),
      columnStyle () {
        return {
          width: this.$q?.screen?.xs
            ? `${this.$q?.screen.width-25}px`
            : '535.89px'
        }
      },
      tempRoom () {
        return {
          image: roomIcon,
          ...(this.activeRoom || {}),
          members: this.tempMembers || [],
          threads: this.tempThreads || [],
          description: TEMP_DESCRIPTION(this.activeRoom?.name || 'civic.love')
        }
      },
      tempThreads () {
        return (this.tempMembers || [])
          .reduce((acc, member) => [...acc, ...(member.threads || [])], [])
          .sort((a, b) => b.messages[0].timestamp - a.messages[0].timestamp)
      }
    },
    methods: {
      ...mapActions(useProfileStore, ['getProfile']),
      ...mapActions(useRoomStore, ['loadRoom']),
      async loadTempMembers () {
        const feedIds = [
          '@DIoOBMaI1f0mJg+5tUzZ7vgzCeeHh8+zGta4pOjc+k0=.ed25519', // Mix
          '@4wXR/KiJrkz9D2LPXpZl5XOLw+gYCoJW6p6rwFlI5yA=.ed25519', // Matt
          '@THUzexG1y6kWofwiN8Lix/jNH/P6roYdlCDgpAn2HSc=.ed25519', // Rabble
          '@UsApPEhMpZaoRzoT6PfWcBct5vOaHXntpndwAbTw3po=.ed25519', // Cherese mobile
          '@xuw3I0S9frG8selUqbPx712E7QM8LwX5rFpRIzgHqx4=.ed25519' // Cherese iPad
        ]

        this.tempMembers = await Promise.all(
          feedIds.map(feedId => this.getProfile(feedId)) // gets their full profile, including threads
        )

        this.tempMembers = this.tempMembers.filter(Boolean)
      },

    }
  }
</script>

<style scoped>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0px;
  top: 129px;
}
</style>