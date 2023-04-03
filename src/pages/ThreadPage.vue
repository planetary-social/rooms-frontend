<template>
  <q-page class="full-width row justify-center">
    <div class="justify-start items-start" :style="columnStyle">
      <threads v-if="thread" :threads="[thread]"  disable-scroll />
    </div>
  </q-page>
</template>

<script>
import isEmpty from 'lodash.isempty'
import { mapActions } from 'pinia'

import Thread from '@/components/Thread.vue'
import Threads from '@/components/Threads.vue'

import { useRoomStore } from '@/store/room'

export default {
  name: 'ThreadPage',
  components: {
    Thread,
    Threads
  },
  data () {
    return {
      thread: null
    }
  },
  async mounted () {
    await this.loadThreadForPage()
  },
  computed: {
    hasComments () {
      return Boolean(this.thread?.replies?.length)
    },
    mobile () {
      return this.$q.screen.xs || this.$q.screen.sm
    },
    columnStyle () {
      return {
        width: this.$q?.screen?.xs
          ? `${this.$q?.screen.width-25}px`
          : '535.89px'
      }
    }
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

      msgId = this.formatMsgId(msgId)
      
      this.loadThread(msgId)
        .then(thread => {
          if (!thread) this.goToHome()
          this.thread = thread
        })
        .catch(err => {
          console.error(err)
          this.goToHome()
        })
    },
    formatMsgId (msgId) {
      // check the msgId doesnt have a / on the end
      // NOTE: this sometimes happens when someone routes to
      // /thread/{msgId}/ which results in no thread being loaded
      if (msgId.endsWith('/')) {
        msgId = msgId.slice(0, -1)
      }

      return msgId
    },
    goToHome () {
      this.$router.push('/')
        .then(() => {
          setTimeout(() => alert("Couldn't load the thread"), 500)
        })
    }
  }
}
</script>