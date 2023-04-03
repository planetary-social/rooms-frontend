<template>
  <q-page class="full-width row justify-center" :style="columnStyle">
    <div class="justify-end">
      <RoomOverview v-if="activeRoom" class="sticky" :room="activeRoom" />
      <OverviewSkeleton v-else  class="sticky" />
    </div>
    <div class="justify-start items-start" :style="columnStyle">
      <threads v-if="threads" :threads="threads" @onLoad="onLoad"/>
      <div v-else>
        <!-- skeleton threads -->
        <CommentSkeleton  v-for="i in 5" :key="i" class="q-my-xl"/>
      </div>
    </div>
  </q-page>
</template>

<script>
  import { mapState, mapActions } from 'pinia'
  import { useRoomStore } from '@/store/room'
  import { useProfileStore } from '@/store/profile'
  import CommentSkeleton from '@/components/CommentSkeleton.vue'

  // components
  import Threads from '@/components/Threads.vue'
  import RoomOverview from '@/components/RoomOverview.vue'
  import OverviewSkeleton from '@/components/RoomOverviewSkeleton.vue'
  
  export default {
    components: {
      Threads,
      RoomOverview,
      CommentSkeleton,
      OverviewSkeleton
    },
    mounted () {
      window.scrollTo(0, 0)
      this.setActiveProfile(null)
      this.loadRoom()
    },
    computed: {
      ...mapState(useRoomStore, ['activeRoom', 'threads']),
      columnStyle () {
        return {
          width: this.$q?.screen?.xs
            ? `${this.$q?.screen.width-25}px`
            : '535.89px'
        }
      }
    },
    methods: {
      ...mapActions(useProfileStore, ['getProfile', 'setActiveProfile']),
      ...mapActions(useRoomStore, ['loadMoreRoomThreads', 'loadRoom']),
      async onLoad (done) {
        await this.loadMoreRoomThreads()
        done()
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