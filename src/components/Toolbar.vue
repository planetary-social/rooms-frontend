<template>
  <q-header class="header">
    <q-toolbar class="toolbar q-mx-auto">
      <q-avatar square @click.prevent="goHome" class="logo">
        <PlanetaryIcon style="width: 35px; height: 35px;"/>
      </q-avatar>
      <PlanetaryTextIcon v-if="!mobile" @click.prevent="goHome" class="logo"/>
      <q-space/>
  
      <q-btn v-if="!mobile" flat no-caps :ripple="false" class="label" href="/">Home</q-btn>
      <q-btn v-if="!mobile" flat no-caps :ripple="false" class="label" href="https://www.planetary.social/">Planetary.social</q-btn>
      <q-btn v-if="!mobile" flat no-caps :ripple="false" class="label" href="https://www.planetary.social/#home-community">Community</q-btn>
      <q-btn v-if="!mobile" flat no-caps :ripple="false" class="label" href="https://planetarysupport.zendesk.com/hc/en-us/categories/360002326834-Rules-Policies">Our Rules</q-btn>
      <q-btn v-if="!mobile" flat no-caps :ripple="false" class="label" href="/login">Login</q-btn>

      <AppStoreBtn v-if="!mobile" href="https://apps.apple.com/us/app/planetary-app/id1481617318"/>


      <q-btn-group v-else class="accent q-pr-md">
        <AppStoreBtn class="app-store-btn" href="https://apps.apple.com/us/app/planetary-app/id1481617318" customStyle="display: block; margin: auto;"/>


        <q-btn-dropdown auto-close :ripple="false" dropdown-icon="menu" size="23px" content-style="background: none; width: 210px;">
          <!-- dropdown content goes here -->
          <q-list class="dropdown">
            <q-item clickable ripple class="menu-item" href="/">
              <q-item-section>
                <q-item-label>Home</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable ripple class="menu-item" href="/login">
              <q-item-section>
                <q-item-label>Login</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable ripple class="menu-item" href="https://www.planetary.social/">
              <q-item-section>
                <q-item-label>Planetary.social</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable class="menu-item" href="https://www.planetary.social/#home-community">
              <q-item-section>
                <q-item-label>Community</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable class="menu-item" href="https://planetarysupport.zendesk.com/hc/en-us/categories/360002326834-Rules-Policies">
              <q-item-section>
                <q-item-label>Our Rules</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-btn-group>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapState } from 'pinia'

import AppStoreBtn from '@/components/icon/AppStoreBtn.vue'
import PlanetaryTextIcon from '@/components/icon/PlanetaryTextIcon.vue'
import PlanetaryIcon from '@/components/icon/PlanetaryIcon.vue'
import { useProfileStore } from '../store/profile';

export default {
  components: {
    AppStoreBtn,
    PlanetaryTextIcon,
    PlanetaryIcon
  },
  computed: {
    ...mapState(useProfileStore, ['activeProfile']),
    mobile () {
      return this.$q.screen.xs || this.$q.screen.sm
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../styles/quasar.variables.scss';

.header {
  height: 129px;
  background: linear-gradient(180deg, #211734 53.36%, rgba(33, 23, 52, 0) 100%);
}

.toolbar {
  height: 129px;
  max-width:1138px;
  padding-bottom: 50px;
}



.label {
  font-family: 'SF Pro Text';
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

.menu-item {
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  // display: flex;
  // align-items: flex-end;
  // text-align: center;
  height: 50px;

  /* Secondary--dark */
  color: #8575A3;
}

.accent  {
  cursor: pointer;
  background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
  text-decoration: none;
  border-radius: 10px;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
  height: 62px;
  width: 210px;
}

.app-store-btn {
  padding-top: 5px;
  // width: 140px;
  // height: 44.7px;
}

.dropdown {
  background: linear-gradient(180deg, #3D2961 0%, #332251 100%);
  // box-shadow: 0px 6.21326px 0px #2C1D45, 0px 30px 20px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  color: white;
  font-size: 20px;
  margin-top: 10px;

  // padding: 0;
}

.logo {
  cursor: pointer;
}

</style>