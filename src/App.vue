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

export default {
  name: "LayoutDefault",
  components: {
    Toolbar
  }
}
</script>
