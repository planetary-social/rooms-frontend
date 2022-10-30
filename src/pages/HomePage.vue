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
  
  export default {
    components: {
      Threads,
      RoomOverview
    },
    data () {
      return {
        activeRoom: {
          name: 'Example Room',
          threads: [
            {
              messages: [
                { text: '## This is a dummy thread' },
              ]
            },
            {
              messages: [
                { text: '## This is a dummy thread' },
              ]
            },
            {
              messages: [
                { text: '## This is a dummy thread' },
              ]
            },
            {
              messages: [
                { text: '## This is a dummy thread' },
              ]
            },
            {
              messages: [
                { text: '## This is a dummy thread' },
              ]
            },
            {
              messages: [
                { text: '## This is a dummy thread' },
              ]
            },
            {
              messages: [
                { text: '## This is a dummy thread' },
              ]
            },
            {
              messages: [
                { text: '## This is a dummy thread' },
              ]
            }
          ]
        }
      }
    },
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