<template>
  <q-card class="thread-card row q-ma-md" dark>
    <!-- the root message in the thread -->
    <comment :comment="rootComment" flat/>
    
  
    <!-- comments on the thread -->
    <q-card-section>
      <comment
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </q-card-section>
  </q-card>
</template>
<script>
  import Comment from '@/components/Comment.vue'
  import { mapState } from 'pinia'
  import { useProfileStore } from '@/stores/profile'

  export default {
    props: {
      thread: Object
    },
    components: {
      Comment
    },
    computed: { 
      ...mapState(useProfileStore, ['activeProfile']),
      startedThread () {
        return this.thread?.messages[0].author === this.activeProfile?.id
      },
      rootComment () {
        if (this.startedThread) return this.thread?.messages[0]

        return this.thread?.messages.find(comment => {
            return comment?.author?.id === this.activeProfile?.id
          })
      },
      // the are all of the messages in the thread, except for the first one
      comments () {
        return this.thread?.messages?.slice(1)
      }
    }
  }
  </script>

<style lang="scss" scoped>
  .thread-card {
    /* Cell--dark */
    background: linear-gradient(180deg, #3D2961 0%, #332251 60.72%);
    /* Cell--dark */
    box-shadow: 0px 4px 0px #2C1D45, 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
  }
</style>