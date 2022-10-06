<template>
  <div class="row">
    <!-- first post is the -->
    <div v-for="thread in threads" :key="thread.id" class="col-12">
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