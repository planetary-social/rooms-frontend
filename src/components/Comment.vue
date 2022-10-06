<template>
  <q-card class="col-12" :class="cardClasses" dark :flat="flat">
    <q-item class="card-header">
      <q-item-section avatar>
        <q-avatar v-if="isHiddenContent" icon="account_circle" size="30px" font-size="30px"/>
        <q-avatar size="30px" class="avatar" v-else>
          <img :src="image" />
        </q-avatar>
      </q-item-section>

      <q-item-section class="q-py-none">
        <q-item-label class="card-header-text q-py-none">
          {{ author?.name || 'Hidden User' }}
          <span class="comment-action q-py-none">{{ action }}</span>
        </q-item-label>
        <!-- <q-item-label class="light-text" caption>
          {{ timestamp }}
        </q-item-label> -->
      </q-item-section>

      <q-item-section side class="comment-action">
        <q-icon size="40px" name="more_horiz" />
      </q-item-section>
    </q-item>

    <q-separator class="top-divider" />

    <q-card-section v-if="isHiddenContent" class="light-text text-center">
      The contents of this message <br/>
      are hidden from you
    </q-card-section>
    <q-card-section v-else-if="comment?.text" class="text q-py-none">
      <Markdown :text="comment.text"/>
    </q-card-section>

    <q-separator v-if="!flat && reactions?.length" class="bottom-divider" />

    <q-card-section v-if="reactions?.length">
      <Reactions :reactions="reactions"/>
    </q-card-section>
  </q-card>
</template>



<script>
import Markdown from './Markdown.vue';
import Reactions from './Reactions.vue';

  export default {
    name: "Comment",
    components: {
      Markdown,
      Reactions
    },
    props: {
        comment: Object,
        flat: Boolean,
        action: String
    },
    computed: {
        cardClasses () {
          return {
            'q-ma-md': !this.flat,
            'comment-card': !this.flat,
            'flat-comment-card': this.flat
          }
        },
        reactions () {
          return this.comment?.votes
        },
        isHiddenContent() {
          return this.comment.id === null;
        },
        showBottomSection () {
          return this.comment?.votes?.length
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

<style lang="scss" scoped>
  @import '../styles/quasar.variables.scss';

  .light-text {
    color: $lightText;
  }

  .text {
    /* Post text */
    // font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    /* or 143% */
    letter-spacing: -0.1px;

    color: $pText;
  }

  .card-header {
    height: 70px;

    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.07) 100%);
    background-blend-mode: overlay;
  }

  .card-header-text {
    // position: absolute;
    // width: 93px;
    height: 16px;
    left: -10px;

    // font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 120%;
    /* identical to box height, or 16px */
    letter-spacing: -0.1px;

    color: #FFFFFF;
  }

  .comment-card {
    /* Cell--dark */
    background: linear-gradient(180deg, #3D2961 0%, #332251 60.72%);
    box-shadow: 0px 4px 0px #2C1D45, 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
  }

  // background styling in parent component
  .flat-comment-card {
    background: none;
  }

  .comment-action {
    color: #8575A3;
  }



  .top-divider {
    height: 0px;

    border: 1px solid #271A3D;
    box-shadow: 0px 2px 0px #4A3275;
  }

  .bottom-divider {
    height: 0px;

    border: 1px solid #201633;
    box-shadow: 0px 2px 0px #402B65;

  }

  .avatar {
    left: 8px;
    top: 3px;
  }
</style>