<template>
  <q-card class="row thread-card q-ma-md" dark>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="image" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-white">{{ author?.name }}</q-item-label>
        <q-item-label class="timestamp" caption>
          {{ timestamp }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section class="text-white">
      <q-card-section class="text-white">
        {{ mainComment?.text }}
      </q-card-section>
    </q-card-section>
  
    <q-card-section>
      <!-- replies-->
      <comment
        v-for="comment in replies"
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
      mainComment () {
        return this.thread?.messages[0]
      },
      author () {
        return this.mainComment?.author
      },
      // TODO:
      image () {
        return `//i.pravatar.cc/150?u=${this.author?.id}`
      },
      // image () {
      //   // TODO: how do i find out the PUB_URL
      //   // TODO: may need to set the backend to serve blobs
      //   if (!this.author?.image) {
      //     return (
      //       'data:image/svg+xml;utf8,' +
      //       generateFromString(this.author?.id)
      //     )
      //   }

      //   return (
      //     PUB_URL +
      //     '/blob/' +
      //     encodeURIComponent(this.author.image)
      //   )
      // },
      timestamp () {
        return Date(this.mainComment?.timestamp)
      },
      replies () {
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
  .timestamp {
    color: #6C6085;
  }
</style>