<template>
  <q-page class="full-width row justify-center">
    <div v-if="activeProfile" class="column">
      <ProfileOverview class="sticky" :profile="activeProfile" />
    </div>
    <div class="justify-start items-start">
      <!-- TODO: move this to graphql -->
      <threads :threads="activeProfile?.threads.filter(thread => thread.messages[0].id)"/>
    </div>
  </q-page>
</template>

<script>
  import { mapState } from 'pinia'
  import { useProfileStore } from '@/stores/profile'
  import ProfileOverview from '@/components/ProfileOverview.vue'

  // components
  import Threads from '@/components/Threads.vue'
  
  export default {
    components: {
      Threads,
      ProfileOverview
    },
    computed: {
      ...mapState(useProfileStore, ['activeProfile'])
    }
  }
</script>

<style scoped>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 129px;
  bottom: 0px;
}
</style>