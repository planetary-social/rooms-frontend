<template>
  <div>
    <div v-for="thread in threads" :key="thread.id" style="margin-bottom: 46px;">
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