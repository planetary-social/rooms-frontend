<template>
  <q-layout class="fit row">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: "LayoutDefault"
}
</script>

<style lang="scss">
body {
  background-color: #1A1229;
}
</style>