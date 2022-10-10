<template>
  <div class="q-ma-md">
    <div v-for="thread in threads" :key="thread.id">
      <thread :thread="thread"/>
    </div>
  </div>
</template>

<script>
import Thread from '@/components/Thread.vue'

export default {
  props: {
    threads: Array
  },
  components: {
    Thread
  }
}
</script>