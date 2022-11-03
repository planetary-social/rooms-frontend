<template>
  <q-page class="full-width row justify-center">
    <!-- TOP SEARCH BAR TO BE REMOVED -->
    <div v-if="activeRoom" class="justify-end">
      <RoomOverview class="sticky" :room="activeRoom" />
    </div>
    <div class="justify-start items-start">
      <threads :threads="activeRoom?.threads"/>
    </div>
  </q-page>
</template>

<script>
  import RoomOverview from '@/components/RoomOverview.vue'

  // components
  import Threads from '@/components/Threads.vue'
import { mapState, mapActions } from 'pinia'
import { useRoomStore } from '@/stores/room'
  
  export default {
    components: {
      Threads,
      RoomOverview
    },
    async mounted () {
      await this.loadRoom()
    },
    computed: {
      ...mapState(useRoomStore, ['activeRoom'])
    },
    methods: {
      ...mapActions(useRoomStore, ['loadRoom'])
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