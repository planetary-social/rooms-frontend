<template>
  <q-page class="full-width row justify-center">
    <div class="column" :style="columnStyle">
      <ProfileOverview v-if="activeProfile" class="sticky" :profile="activeProfile" />
      <OverviewSkeleton v-else class="sticky" />
    </div>
    <div class="justify-start items-start" :style="columnStyle">
      <threads v-if="threads" :threads="threads" @onLoad="onLoad"/>
      <div v-else>
        <!-- skeleton threads -->
        <CommentSkeleton  v-for="i in 5" :key="i" class="q-my-xl"/>
      </div>
    </div>
  </q-page>
</template>

<script>
  import isEmpty from 'lodash.isempty'
  import { mapActions, mapState } from 'pinia'
  import { useProfileStore } from '@/store/profile'


  // components
  import Threads from '@/components/Threads.vue'
  import ProfileOverview from '@/components/ProfileOverview.vue'
  import CommentSkeleton from '@/components/CommentSkeleton.vue'
  import OverviewSkeleton from '@/components/ProfileOverviewSkeleton.vue'

  export default {
    components: {
      Threads,
      ProfileOverview,
      CommentSkeleton,
      OverviewSkeleton
    },
    computed: {
      ...mapState(useProfileStore, ['activeProfile', 'threads']),
      columnStyle () {
        return {
          width: this.$q?.screen?.xs
            ? `${this.$q?.screen.width-25}px`
            : '535.89px'
        }
      }
    },
    data () {
      return {
        isLoadingInitialThreads: false
      }
    },
    async mounted () {
      await this.loadProfileForPage()
    },
    methods: {
      ...mapActions(useProfileStore, ['loadMinimalProfile', 'loadMinimalProfileByAlias', 'loadProfile', 'loadMoreProfileThreads', 'loadProfileThreads']),
      async loadProfileForPage () {
        var { alias, feedId } = this.$route.params

        if (isEmpty(alias) && isEmpty(feedId)) {
          this.goToHome('No alias or feedId found to load the profile')
          return
        }

        this.isLoadingInitialThreads = true

        // firstly load the minimal profile by either the feedId or alias (depending on the route)
        if (feedId) {
          feedId = this.formatFeedId(feedId)

          await this.loadMinimalProfile(feedId)
        } else if (alias && !feedId) {
          await this.loadMinimalProfileByAlias(alias)
        }

        if (!this.activeProfile) {
          this.goToHome("Couldn't load the profile")
          return
        }

        // load the full profile
        await this.loadProfile(this.activeProfile.id)

        
        await this.loadProfileThreads()
          .finally(() => {
            this.isLoadingInitialThreads = false
          })
      },
      formatFeedId (feedId) {
        // check the feedId doesnt have a / on the end
        // NOTE: this sometimes happens when someone routes to
        // /profile/{feedId}/ which results in no profile being loaded
        if (feedId.endsWith('/')) {
          feedId = feedId.slice(0, -1)
        }

        return feedId
      },
      async onLoad (done) {
        if (this.isLoadingInitialThreads) {
          done()
          return
        }

        await this.loadMoreProfileThreads()
        done()
      },
      goToHome (msg) {
        this.$router.push('/')
          .then(() => {
            setTimeout(() => alert(msg), 500)
          })
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