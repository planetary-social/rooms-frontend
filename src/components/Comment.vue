<template>
  <q-card class="col-12 comment-card q-ma-md" dark>
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

    <q-card-section>
      <q-card-section class="text-white">
        {{ comment.text }}
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script>
  // import { generateFromString } from 'generate-avatar'
  // const PUB_URL = 'http://0.0.0.0:8888'

  export default {
    name: 'Comment',
    props: {
      comment: Object
    },
    computed: {
      author () {
        return this.comment?.author
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
        return Date(this.comment?.timestamp).toString()
      }
    }
  }
</script>

<style scoped>
  .comment-card {
    background-color: #332b45;
    border-radius: 20px;
  }
  .timestamp {
    color: #6C6085;
  }
</style>