<template>
  <q-header class="header">
    <q-toolbar class="toolbar q-mx-auto">
      <q-avatar>
        <PlanetaryIcon/>
      </q-avatar>
      <PlanetaryTextIcon/>
      <q-space/>
  
      <q-btn disabled flat no-caps :ripple="false" class="label">Planetary.social</q-btn>
      <q-btn disabled flat no-caps :ripple="false" class="label">Community</q-btn>
      <q-btn disabled flat no-caps :ripple="false" class="label">Our Rules</q-btn>
      <!-- TODO: link to app store download -->
      <AppStoreBtn />
    </q-toolbar>
    <!-- TODO: temp ui to allow profile navigation -->
    <q-toolbar class="toolbar-temp q-mx-auto">
      <q-breadcrumbs active-color="white" style="font-size: 16px">
        <q-breadcrumbs-el label="Home" icon="home" />
        <q-breadcrumbs-el v-if="$route?.name === 'profile' && activeProfile" label="Profile" icon="person" />
        <q-breadcrumbs-el v-if="$route?.name === 'profile'" :label="activeProfile?.name" />
      </q-breadcrumbs>
      <q-space/>
      <q-input
        v-model="feedId"
        dark dense standout
        input-class="text-center"
        class="q-ml-md self-center"
        placeholder="enter a @feedId"
        :style="inputStyle"
      >
        <!-- <template v-slot:append> -->
          <!-- <q-icon v-if="feedId === ''" name="search" /> -->
          <!-- <q-icon v-else name="clear" class="cursor-pointer" @click="feedId = ''" /> -->
        <!-- </template> -->
      </q-input>
      <q-btn
        class="justify-center"
        flat
        outlined
        color="accent"
        @click="goProfile"
        :loading="loading"
        label="Go"
      />
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState, mapActions } from 'pinia'

import AppStoreBtn from '@/components/icon/AppStoreBtn.vue'
import PlanetaryTextIcon from '@/components/icon/PlanetaryTextIcon.vue'
import PlanetaryIcon from '@/components/icon/PlanetaryIcon.vue'
import { useProfileStore } from '../stores/profile';

export default {
  components: {
    AppStoreBtn,
    PlanetaryTextIcon,
    PlanetaryIcon
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
    inputStyle () {
      return {
        width: this.$q?.screen?.xs
          ? `${this.$q?.screen?.width}px`
          : '535.89px'
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

<style lang="scss"  scoped>
@import '../styles/quasar.variables.scss';

.toolbar-temp {
  max-width:1138px;
  background-color: $appBackground;
  margin-bottom: 10px;
}

.toolbar {
  height: 70px;

  /* Cell--dark */
  background: linear-gradient(180deg, #3D2961 0%, #332251 60.72%);
  box-shadow: 0px 1.90476px 14.2857px rgba(24, 23, 35, 0.1), inset 0px -0.47619px 0px rgba(0, 0, 0, 0.45);
  border-radius: 0px 0px 25px 25px;
  max-width:1138px;
}

.header {
  border-radius: 0px 0px 25px 25px;
  background: none;
}

.label {
  /* font-family: 'SF Pro Text'; */
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: flex-end;
  text-align: center;

  /* Secondary--dark */
  color: #8575A3;
}

</style>