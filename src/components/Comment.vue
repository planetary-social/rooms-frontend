<template>
  <q-card :class="cardClasses" dark :flat="flat">
    <q-item class="card-header">
      <q-item-section avatar @click="goProfile" style="cursor: pointer;">
        <q-avatar size="30px" class="avatar">
          <q-img :src="image" loading="eager" no-spinner :placeholder-src="defaultAvatar" contain width="30px" height="30px" />
        </q-avatar>
      </q-item-section>

      <q-item-section no-wrap>
        <q-item-label class="card-header-text">
          <span class="q-pr-xs" style="cursor: pointer;" @click="goProfile">{{ author?.name || 'Hidden User' }}</span>
          <span class="comment-action">{{ action }}</span>
        </q-item-label>
        <q-item-label class="light-text" style="left: -10px;" caption>
          {{ timestamp }}
        </q-item-label>
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

    <q-card-section v-if="reactions?.length" :class="{ 'q-py-none': flat }">
      <Reactions :reactions="reactions"/>
    </q-card-section>
  </q-card>
</template>



<script>
import { mapState, mapActions } from 'pinia'

import Markdown from './Markdown.vue'
import Reactions from './Reactions.vue'
import { useProfileStore } from '@/stores/profile'

import defaultAvatar from '@/assets/avatar.png'

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
        ...mapState(useProfileStore, ['activeProfile']),
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
          return this.comment.id === null
        },
        showBottomSection () {
          return this.comment?.votes?.length
        },
        author () {
          return this.comment?.author
        },
        defaultAvatar () {
          return defaultAvatar
        },
        image () {
          return this.author?.image || this.defaultAvatar
        },
        date () {
          return new Date(this.comment?.timestamp)
        },
        dateMinutes () {
          return 
        },
        timestamp () {
          const d = new Date(this.comment?.timestamp)

          const minutes = ('0'+ this.date.getUTCMinutes()).slice(-2)
          const hours = d.getUTCHours()

          const ampm = hours > 12 ? 'PM' : 'AM'

          return `${d.toDateString()} ${hours}:${minutes} ${ampm}`
        }
    },
    methods: {
      ...mapActions(useProfileStore, ['setActiveProfile']),
      goProfile () {
        if (!this.author?.id) return
        window.scrollTo(0, 0)

        // if we are already on this persons profile, then just scroll to the top
        if (this.author?.id === this.activeProfile?.id) {
          window.scrollTo(0, 0)
          return
        }
    
        // set the active profile as the authors
        this.setActiveProfile(this.author)
        
        // go to their profile
        this.$router.push({ name: 'profile', params: { feedId: this.author.id }})
      }
    }
    
}
</script>

<style lang="scss" scoped>
  @import '../styles/quasar.variables.scss';

  .light-text {
    color: $lightText;
  }

  .text {
    /* Post text */
    font-family: 'SF Pro Text';
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
    height: 16px;
    left: -10px;

    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 120%;
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

    border: 0.5px solid #271A3D;
    box-shadow: 0px 2px 0px #4A3275;
  }

  .bottom-divider {
    height: 0px;

    border: 0.5px solid #201633;
    box-shadow: 0px 2px 0px #402B65;

  }

  .avatar {
    width: 30px;
    height: 30px;
  }
</style>