<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view :key="$route.path"/>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: "LayoutDefault"
}
</script>
