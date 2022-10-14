<template>
  <q-page class="full-width row justify-center" padding>
    <!-- TOP SEARCH BAR TO BE REMOVED -->
    <div class="col-6">
      <ProfileOverview :profile="activeProfile" />
    </div>
    <div class="col-6">
      <threads :threads="activeProfile?.threads"/>
    </div>
  </q-page>
</template>

<script>
  import { mapState, mapActions } from 'pinia'
  import { useProfileStore } from '@/stores/profile'
  import ProfileOverview from '@/components/ProfileOverview.vue'

  // components
  import Threads from '@/components/Threads.vue'
  
  export default {
    components: {
      Threads,
      ProfileOverview
    },
    data () {
      return {
        feedId: '@DIoOBMaI1f0mJg+5tUzZ7vgzCeeHh8+zGta4pOjc+k0=.ed25519',
        loading: false
      }
    },
    watch: {
      '$route.params.feedId': {
        immediate: true,
        deep: true,
        async handler (feedId) {
          if (!feedId || feedId === '') return
          this.loading = true

          useProfileStore().$reset()
          this.feedId = decodeURIComponent(feedId)
          await this.loadProfile(this.feedId)
          window.scrollTo(0, 0)

          this.loading = false
        }
      }
    },
    computed: {
      ...mapState(useProfileStore, ['activeProfile']),
      // note: this could be false when its still loading,
      // or the profile came back as null
      hasActiveProfile () {
        return this.activeProfile !== null
      },
      inputSize () {
        return {
          width: this.$q?.screen?.xs
            ? `${this.$q?.screen?.width}px`
            : '500px'
        }
      }
    },
    methods: {
      ...mapActions(useProfileStore, ['loadProfile', 'getMinimalProfile']),
      async goProfile () {
        if (!this.feedId) return

        if (this.feedId === this.activeProfile?.id) {
          window.scrollTo(0, 0)
          return
        }

        // attempt to load the profile
        const profile = await this.getMinimalProfile(this.feedId)
        
        if (profile) {
          useProfileStore().$reset()
          const encodedFeedId = encodeURIComponent(this.feedId)
          this.$router.push({ name: 'profile', params: { feedId: encodedFeedId } })
        }
        else {
          alert('This profile is not available')
        }
      }
    }
  }
</script>
