<template>
  <div class="row">
    <comment :comment="mainThread"/>

    <!-- replies-->
    <comment
      v-for="comment in replies"
      :key="comment.id"
      :comment="comment"
    />
  </div>
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
      mainThread () {
        return this.thread?.messages[0]
      },
      replies () {
        return this.thread?.messages?.slice(1)
      }
    }
  }
  </script>