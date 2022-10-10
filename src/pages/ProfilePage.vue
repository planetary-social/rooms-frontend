<template>
  <q-page class="row items-center">
    <div class="column items-center">
      <div class="col-12">
        <h3>{{ hasActiveProfile ? activeProfile?.name : 'Unavailable' }}</h3>
      </div>
      <div class="col-12">
        <small>
          {{ $route?.params?.feedId }}
        </small>
      </div>
      <div class="col-12">
        <threads :threads="activeProfile?.threads"/>
      </div>    
    </div>
  </q-page>
</template>

<script>
  import { mapState, mapActions } from 'pinia'
  import { useProfileStore } from '@/stores/profile'

  // components
  import Threads from '@/components/Threads.vue'
  
  export default {
    components: {
      Threads
    },
    async mounted () {
      let feedId = this.$route?.params?.feedId
      if (feedId) feedId = decodeURIComponent(feedId)
    
      // if (!feedId) feedId = '@DIoOBMaI1f0mJg+5tUzZ7vgzCeeHh8+zGta4pOjc+k0=.ed25519'
      await this.loadProfile(feedId)
    },
    computed: {
      ...mapState(useProfileStore, ['activeProfile']),
      // note: this could be false when its still loading,
      // or the profile came back as null
      hasActiveProfile () {
        return this.activeProfile !== null
      },
      encodedFeedId () {
        return encodeURIComponent(this.activeProfile?.id)
      }
    },
    methods: {
      ...mapActions(useProfileStore, ['loadProfile'])
    }
  }
</script>
