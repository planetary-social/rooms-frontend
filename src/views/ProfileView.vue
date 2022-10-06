<template>
  <div class="row">
    <div class="col-12">
      <h2>Profile: {{ activeProfile?.name }}</h2>
      <small>Id: {{ activeProfile?.id }}</small>
    </div>

    <div class="col-12">
      <threads :threads="activeProfile?.threads"/>
    </div>    
  </div>
</template>

<script>
  // import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useProfileStore } from '@/stores/profile'

  // components
  import Threads from '@/components/Threads.vue'
  
  export default {
    components: {
      Threads
    },
    setup() {
      const profile = useProfileStore()

      const { activeProfile } = storeToRefs(profile)
      const { loadProfile } = profile

      // TODO
      loadProfile('@DIoOBMaI1f0mJg+5tUzZ7vgzCeeHh8+zGta4pOjc+k0=.ed25519')

      return {
        // profile
        activeProfile
      }
    }
  }
</script>
