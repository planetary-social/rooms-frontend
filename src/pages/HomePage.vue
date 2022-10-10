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
        >
          Load Profile
        </q-btn>
      </div>
      <div class="col-12">
        <router-view />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useProfileStore } from '../stores/profile';
  export default {
    data () {
      return {
        feedId: '@DIoOBMaI1f0mJg+5tUzZ7vgzCeeHh8+zGta4pOjc+k0=.ed25519'
      }
    },
    computed: {
      ...mapWritableState(useProfileStore, ['activeProfile']),
      inputSize () {
        return {
          width: this.$q?.screen?.xs
            ? `${this.$q?.screen?.width}px`
            : '500px'
        }
      }
    },
    mounted () {
      console.log(this.$q)
    },
    methods: {
      ...mapActions(useProfileStore, ['getMinimalProfile']),
      async goProfile () {
        if (!this.feedId) return

        // TODO: check feedId is a valid feedId
        
        // attempt to load the profile
        const profile = await this.getMinimalProfile(this.feedId)
        if (this.activeProfile?.id !== this.feedId) this.activeProfile = profile
        
        if (profile) {
          this.$router.push({ name: 'profile', params: { feedId: this.feedId } })
        }
        else {
          alert('This profile is not available')
          this.$router.push({ name: 'home' })
        }
      }
    }
  }
  </script>