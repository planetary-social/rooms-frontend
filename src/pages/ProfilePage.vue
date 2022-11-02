<template>
  <q-page class="full-width row justify-center">
    <div class="column" v-if="activeProfile" :style="columnStyle">
      <ProfileOverview class="sticky" :profile="activeProfile" />
    </div>
    <div v-else>
      {{ errorMsg }}
      <q-btn to="/" flat rounded no-caps>
        {{ '< Back' }}
      </q-btn>
    </div>
    <div class="justify-start items-start" :style="columnStyle">
      <threads :threads="activeProfile?.threads || []"/>
    </div>
  </q-page>
</template>

<script>
  import { mapActions, mapState } from 'pinia'
  import { useProfileStore } from '@/stores/profile'


  // components
  import Threads from '@/components/Threads.vue'
  import ProfileOverview from '@/components/ProfileOverview.vue'
  
  export default {
    components: {
      Threads,
      ProfileOverview
    },
    computed: {
      ...mapState(useProfileStore, ['activeProfile']),
      columnStyle () {
        return {
          width: this.$q?.screen?.xs
            ? `${this.$q?.screen.width-25}px`
            : '535.89px'
        }
      }
    },
    async mounted () {
      await this.loadProfileForPage()
    },
    methods: {
      ...mapActions(useProfileStore, ['loadMinimalProfile', 'loadMinimalProfileByAlias', 'loadProfile']),
      async loadProfileForPage () {
        var { alias, feedId } = this.$route.params

        // firstly load the minimal profile by either the feedId or alias (depending on the route)
        if (feedId) await this.loadMinimalProfile(feedId)
        else if (alias && !feedId) {
          await this.loadMinimalProfileByAlias(alias)
        }

        if (!this.activeProfile) {
          alert('failed to load a profile.... uh oh')
          // TODO: route back
          return
        }

        // load the full profile
        await this.loadProfile(this.activeProfile.id)
      }
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