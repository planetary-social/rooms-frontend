<template>
  <q-card class="thread-card row q-ma-md" dark>
    <!-- the root message in the thread -->
    <comment :comment="rootMessage" flat action="posted" />
    
  
    <!-- comments on the thread -->
    <q-card-section>
      <comment
        v-for="comment in viewableComments"
        :key="comment.id"
        :comment="comment"
        action="replied"
      />
    </q-card-section>
    
    <!-- TODO: how to display hidden comments -->
    <p class="q-px-xs">
      {{ hiddenComments?.length }} hidden replies
    </p>
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
      rootMessage () {
        return this.thread?.messages[0]
      },
      startedThread () {
        return this.rootMessage.author
      },
      shownMessage () {
        // if there is an author for the first message
        // i.e. we can see it
        if (this.rootMessage.author) return this.rootMessage

        return this.thread?.messages.find(comment => {
            return comment?.author?.id === this.activeProfile?.id
          })
      },
      // the are all of the messages in the thread, except for the first one
      viewableComments () {
        return this.thread?.messages?.slice(1)
          .filter(comment => comment.author)
      },
      hiddenComments () {
        return this.thread?.messages?.slice(1)
          .filter(comment => !comment.author)
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