<template>
  <q-layout view="hHh lpr fFf">
    <Toolbar />
    <q-page-container>
      <router-view :key="$route.path"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'
import { mapActions } from 'pinia'
import { useRoomStore } from '@/store/room'

export default {
  name: "App",
  components: {
    Toolbar
  }
}
</script>
