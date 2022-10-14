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
  </q-header>
</template>

<script setup>
import AppStoreBtn from '@/components/icon/AppStoreBtn.vue'
import PlanetaryTextIcon from '@/components/icon/PlanetaryTextIcon.vue'
import PlanetaryIcon from '@/components/icon/PlanetaryIcon.vue'

</script>

<style scoped>
/* App header background */
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
  /* max-width:1138px; */
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