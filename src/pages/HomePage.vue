<template>
  <q-page class="q-gutter-y-md column" style="width: 100%; max-width: 100%">
    <q-input
      v-model="feedId"
      dark standout
      input-class="text-center"
      placeholder="Enter a @feedId"
    />
    <q-btn
      color="primary"
      class="text-center"
      @click="goProfile"
    >
      Go to profile
    </q-btn>
  </q-page>
</template>

<script>
import { mapActions } from 'pinia'
import { useProfileStore } from '../stores/profile';
  export default {
    data () {
      return {
        feedId: null
      }
    },
    methods: {
      ...mapActions(useProfileStore, ['getProfile']),
      async goProfile () {
        if (!this.feedId) return

        // TODO: check feedId is a valid feedId
        
        // attempt to load the profile
        const profile = await this.getProfile(this.feedId)
        if (profile) this.$router.push({ name: 'profile', params: { feedId: this.feedId } })
        else {
          alert('This profile is not available')
        }
      }
    }
  }
  </script>