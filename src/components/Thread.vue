<template>
  <q-card class="row thread-card q-ma-md" dark>
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

  export default {
    props: {
      thread: Object
    },
    components: {
      Comment
    },
    computed: { 
      rootComment () {
        return this.thread?.messages[0]
      },
      // the are all of the messages in the thread, except for the first one
      comments () {
        return this.thread?.messages?.slice(1)
      }
    }
  }
  </script>

<style scoped>
  .thread-card {
    background-color: #302a42;
    border-radius: 20px;
  }
</style>