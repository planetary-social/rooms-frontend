<template>
  <q-infinite-scroll @load="onLoad" :offset="1000">
    <div v-if="displayedThread" :class="{ fixed: !mobile, toolbar: !mobile, 'mobile-toolbar': mobile }" style="z-index: 3"> 
      <q-toolbar style="margin-left:40px; cursor: pointer;" @click="displayThread(null)" class="q-py-lg">
        <svg width="22" height="15" viewBox="0 0 22 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.433477 8.69389C0.166085 8.43365 -1.83464e-07 8.06984 -2.01063e-07 7.66724C-0.000146145 7.3089 0.133401 6.95002 0.400642 6.6725L6.08342 0.771154C6.63219 0.201273 7.53905 0.184164 8.10893 0.732938C8.67881 1.28171 8.69592 2.18856 8.14714 2.75844L4.79961 6.23473L20.5675 6.23473C21.3586 6.23473 22 6.87609 22 7.66724C22 8.45839 21.3586 9.09974 20.5675 9.09974L4.80171 9.09974L8.14715 12.5738C8.69592 13.1437 8.67881 14.0506 8.10893 14.5994C7.53905 15.1481 6.6322 15.131 6.08342 14.5611L0.433477 8.69389Z" fill="white"/>
          </svg>
          <q-toolbar-title class="toolbar-header">Back to feed</q-toolbar-title>
      </q-toolbar>
    </div>
    <div v-show="!displayedThread" style="z-index: 1">
      <div v-for="thread in threads" :key="thread.id" style="margin-bottom: 46px;">
        <thread :thread="thread" @open="displayThread(thread)" />
      </div>
    </div>
    <div v-if="displayedThread" :style="{ 'z-index': 2, 'margin-top': mobile ? '' : '100px' }">
      <thread :thread="displayedThread" show-comments />
    </div>
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script>
import Thread from '@/components/Thread.vue'

export default {
  props: {
    threads: Array
  },
  data () {
    return {
      displayedThread: null
    }  
  },
  components: {
    Thread
  },
  computed: {
    mobile () {
      return this.$q.screen.xs || this.$q.screen.sm
    }
  },
  methods: {
    displayThread (thread) {
      window.scrollTo(0, 0)
      this.displayedThread = thread
    },
    onLoad (index, done) {
      this.$emit('onLoad', done)
    }
  }
}
</script>

<style scoped lang="scss">
  .toolbar-header {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 120%;
    /* identical to box height, or 24px */
    letter-spacing: -0.174603px;

    /* Secondary--dark */
    color: #8575A3;
  }

  .toolbar {
    top: 0px;
    padding-top: 130px;
    padding-bottom: 55px;
    width: 100%;
    margin-left: -50px;
    background: linear-gradient(180deg, #1A1229 70%, rgba(33, 23, 52, 0) 90%);
  }

  .mobile-toolbar {
    width: 100%;
    margin-left: -50px;
    background: linear-gradient(180deg, #1A1229 70%, rgba(33, 23, 52, 0) 90%);
  }
</style>