<template>
  <q-page class="row justify-center items-center content-center" padding>
    <div class="column items-center">
      <div class="col-12">
        <q-input
          v-model="feedId"
          dark
          standout
          input-class="text-center"
          class="self-center q-px-md"
          placeholder="Enter a @feedId"
          :style="inputSize"
        />
      </div>
      <div class="col-12 q-pa-sm">
        <q-btn
          class="justify-center"
          color="primary"
          @click="goProfile"
          :loading="loading"
          label="Load Profile"
        />
      </div>
      <div class="col-12">
        <h3>{{ activeProfile?.name }}</h3>
      </div>
      <div class="col-12">
        <small>
          {{ activeProfile?.id }}
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
