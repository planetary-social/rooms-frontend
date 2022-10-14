<template>
  <q-page class="full-width row justify-center" padding>
    <!-- TOP SEARCH BAR TO BE REMOVED -->
    <div v-if="activeProfile" class="column items-end" style="margin-top:26px;">
      <ProfileOverview class="sticky" :profile="activeProfile" />
    </div>
    <div class="column items-start">
      <threads :threads="activeProfile?.threads"/>
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
  top: 200px;
  bottom: 0px;
}
</style>