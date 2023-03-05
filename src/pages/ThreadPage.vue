<template>
  <q-page>
    <thread v-if="thread" :thread="thread"></thread>
  </q-page>
</template>

<script>
import isEmpty from 'lodash.isempty'
import { mapActions } from 'pinia'

import Thread from '@/components/Thread.vue'
import { useRoomStore } from '@/store/room'

export default {
  name: 'ThreadPage',
  components: {
    Thread
  },
  data () {
    return {
      thread: null
    }
  },
  async mounted () {
    await this.loadThreadForPage()
  },
  methods: {
    ...mapActions(useRoomStore, ['loadThread']),
    async loadThreadForPage () {
      var { msgId } = this.$route.params

      if (isEmpty(msgId)) {
        alert('no message found to load the page')
        this.$router.push('/')
        return
      }

      // load the thread
      await this.loadThread(msgId)
    }
  }
}
</script>