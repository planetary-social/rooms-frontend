<template>
  <q-card class="col-12 comment-card" :class="{ 'q-ma-md': !flat }" dark :flat="flat">
    <q-item>
      <q-item-section avatar>
        <q-avatar v-if="isHiddenContent" icon="account_circle" size="50px" font-size="50px"/>
        <q-avatar v-else>
          <img :src="image" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-white">{{ author?.name || 'TODO' }}</q-item-label>
        <q-item-label class="dimmed-text" caption>
          {{ timestamp }}
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section v-if="isHiddenContent">
      <q-card-section class="dimmed-text text-center">
        The contents of this message <br/>
        are hidden from you
      </q-card-section>
    </q-card-section>
    <q-card-section v-else-if="comment?.text">
      <q-card-section class="text-white">
        <Markdown :text="comment.text"/>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import Markdown from './Markdown.vue';

  export default {
    name: "Comment",
    components: {
      Markdown
    },
    props: {
        comment: Object,
        flat: Boolean
    },
    computed: {
        isHiddenContent() {
            return this.comment.id === null;
        },
        author() {
            return this.comment?.author;
        },
        image() {
            return this.author?.image || "https://cdn.quasar.dev/img/boy-avatar.png"; // TODO!
        },
        timestamp() {
            return Date(this.comment?.timestamp).toString();
        }
    },
    
}
</script>

<style scoped>
  .comment-card {
    background-color: #332b45;
    border-radius: 20px;
  }
  .dimmed-text {
    color: #6C6085;
  }
</style>