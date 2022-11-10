<template>
  <q-page class="full-width row justify-center" :style="columnStyle">
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
  
  export default {
    components: {
      Threads,
      RoomOverview
    },
    data () {
      return {
        tempThreads: []
      }
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
          ...(this.activeRoom || {}),
          threads: this.tempThreads || []
        }
      }
    },
    methods: {
      ...mapActions(useProfileStore, ['getProfile'])
    },
    watch: {
      // NOTE: this is a temp solution to show threads by all members
      // until the backend piece is written.
      // I have done it here so it doesnt prevent members from showing up.
      // because loading members and threads in the getMyRoom query
      // may take a while
      'activeRoom.members': {
        immediate: true,
        async handler (members) {
          if (!members || !members.length) return

          // load the members full profile which includes threads
          const memberThreads = await Promise.all(members.map(async member => this.getProfile(member.id)))

          this.tempThreads = memberThreads
            .reduce((acc, member) => [...acc, ...(member.threads || [])], [])
            .sort((a, b) => b.messages[0].timestamp - a.messages[0].timestamp)
        }
      }
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