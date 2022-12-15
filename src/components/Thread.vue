<template>
  <div v-if="rootMessage?.author?.id || latestMemberMessage" :class="{ 'thread-card': showComments }">
    <!-- the root message in the thread -->

    <!--
      If the author of the rootMessage is not the author,
      then we display it differently and display the first message
      from the activeProfile (if there is one...) or the first message from a member
    -->
    <comment :flat="showComments" :comment="rootMessage" :action="isFromMember ? 'posted' : ''" :width="rootMessageWidth" :height="rootMessageHeight" :preview="!isFromMember && !showComments" :comments="comments" @open="$emit('open')"/>
    <comment v-if="(!isFromMember && !showComments) && latestMemberMessage" :comment="latestMemberMessage" action="replied" :style="{'margin-top': '-18px' }" top-shadow @open="$emit('open')" />

    <q-card-section v-if="showComments && comments?.length" style="background: #2B1D44;">
      <span class="card-header-text row" style="cursor: pointer; padding-left: 20px;" @click="$emit('open')">
        <AvatarGroup v-if="commenters?.length" :group="commenters" :limit="2" overlapping :size="20" no-background />
        <span class="q-pr-xs">{{ comments?.length }}</span>
        <span class="comment-action" style="padding-left:5px;">{{ comments.length === 1 ? 'reply' : 'replies' }}</span>
      </span>
    </q-card-section>
    
  
    <!-- comments on the thread -->
    <q-card-section class="q-px-none" v-if="showComments" style="background: #2B1D44;">
      <comment
        v-for="comment in viewableComments"
        :key="comment.id"
        :comment="comment"
        action="replied"
        class="q-py-md"
        margin-top="20px"
        :width="commentsWidth"
      />
    </q-card-section>
    
    <q-card-section v-if="showComments && hiddenComments.length" style="background: #2B1D44;">
      <span class="card-header-text row" style="cursor: pointer; padding-left: 20px;" @click="$emit('open')">
        <span class="q-pr-xs">{{ hiddenComments?.length }}</span>
        <span class="comment-action" style="padding-left:5px;">hidden {{ hiddenComments?.length === 1 ? 'reply' : 'replies' }}</span>
      </span>
    </q-card-section>
    <q-card-section style="height: 60px;" v-if="showComments" />
  </div>
</template>
<script>

  import uniqBy from 'lodash.uniqby'
  import Comment from '@/components/Comment.vue'
  import AvatarGroup from '@/components/avatar/AvatarGroup.vue'
  import { mapState } from 'pinia'
  import { useProfileStore } from '@/stores/profile'
  import { useRoomStore } from '../stores/room'

  export default {
    props: {
      thread: Object,
      showComments: Boolean
    },
    components: {
      Comment,
      AvatarGroup
    },
    computed: { 
      ...mapState(useProfileStore, ['activeProfile']),
      ...mapState(useRoomStore, ['activeRoom']),
      mobile () {
        return this.$q?.screen?.xs || this.$q?.screen.sm
      },
      commenters () {
          return uniqBy(this.comments?.map(message => message?.author), 'id')
            .filter(Boolean)
        },
      rootMessageWidth () {
        const maxWidth = this.isFromMember ? 535.89 : 481.8

        if (this.mobile) {
          const screenWidth = this.$q.screen.width
          const maxMobileWidth = screenWidth > maxWidth ? maxWidth : screenWidth

          return `${maxMobileWidth-(this.isFromMember ? 25 : 60)}px`
        }

        return this.isFromMember || this.showComments ? '535.89px' : '481.8px'
      },
      commentsWidth () {
        return this.mobile
          ? `${this.$q?.screen.width-60}px`
          : '481.8px'
      },
      rootMessageHeight () {
        if (this.isFromMember) return
        if (this.showComments) return

        return '175px'
      },
      rootMessage () {
        return this.thread?.messages[0]
      },
      // the first reply from the activeProfile or a member
      latestMemberMessage () {
        if (this.isFromMember) return

        if (this.$route.name === 'profile') {
          return this.thread?.messages.find(message => message?.author?.id === this.activeProfile?.id)
        }

        const reverted = [...this.thread?.messages].reverse();

        return reverted.find(message => {
          return this.activeRoom?.members.find(member => {
            return member?.id && member?.id === message?.author?.id
          })
        })
      },
      isFromMember () {
        if (!this.rootMessage?.author?.id) return false
        if (this.activeProfile) return this.rootMessage?.author?.id === this.activeProfile?.id

        return this.activeRoom?.members?.some(member => member?.id === this.rootMessage?.author?.id)
      },
      comments () {
        // remove the root message
        return this.thread?.messages?.slice(1)
          .filter(message => {
            if (!this.latestMemberMessage) return true
            if (!message?.id) return true 
            return message?.id === this.latestMemberMessage?.id
        })
      },
      // the are all of the messages in the thread, except for the first one
      viewableComments () {
        return this.comments
          .filter(comment => comment.author)
      },
      hiddenComments () {
        return this.comments
          .filter(comment => !comment.author)
      }
    }
  }
  </script>

<style lang="scss" scoped>

  @import '../styles/quasar.variables.scss';
  .thread-card {
    /* Cell--dark */
    background: linear-gradient(180deg, #3D2961 0%, #332251 60.72%);
    /* Cell--dark */
    box-shadow: 0px 4px 0px #2C1D45, 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
  }

  .light-text {
    color: $lightText;
  }

  // .comment-card {
  //   box-shadow:
  //     0px 6.21326px 0px #2C1D45,
  //     0px 6.21326px 15.5331px rgba(0, 0, 0, 0.25);

  //   -webkit-box-shadow:
  //     0px 6.21326px 0px #2C1D45,
  //     0px 6.21326px 15.5331px rgba(0, 0, 0, 0.25);

  //   border-radius: 31.0663px;


  //   background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.07) 100%);
  //   background-blend-mode: overlay;
  // }

  .card-header-text {
    // height: 16px;
    left: -10px;

    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.15533140301704407px;
    text-align: left;

    color: #FFFFFF;
  }

  .comment-action {
    color: #8575A3;
  }

</style>