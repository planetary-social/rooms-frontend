<template>
  <div>
    <!-- TODO: replied text on profile -->
    <comment
      v-if="rootMessage?.id !== mainComment?.id"
      :comment="rootMessage"
      action="posted"
      
      :preview="!isThreadPage"

      :width="rootMessageWidth"
      
      @open="$emit('open')"
    />

    <comment
      :comment="mainComment"
      :action="mainCommentType"
    
      :style="{'margin-top': '-18px' }"
      top-shadow
      
      @open="$emit('open')"
    >
      <template v-slot:content v-if="showComments">
        <q-card-section v-if="viewableComments?.length" style="background: #2B1D44;">
          <span class="card-header-text row" style="cursor: pointer; padding-left: 20px;" @click="$emit('open')">
            <AvatarGroup v-if="commenters?.length" :group="commenters" :limit="2" overlapping :size="20" no-background />
            <span class="q-pr-xs">{{ viewableComments?.length }}</span>
            <span class="comment-action" style="padding-left:5px;">{{ viewableComments.length === 1 ? 'reply' : 'replies' }}</span>
          </span>
        </q-card-section>
        
      
        <!-- comments on the thread -->
        <q-card-section class="q-px-none" style="background: #2B1D44;">
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
        
        <q-card-section v-if="hiddenComments?.length" style="background: #2B1D44;">
          <span class="card-header-text row" style="cursor: pointer; padding-left: 20px;" @click="$emit('open')">
            <span class="q-pr-xs">{{ hiddenComments?.length }}</span>
            <span class="comment-action" style="padding-left:5px;">hidden {{ hiddenComments?.length === 1 ? 'reply' : 'replies' }}</span>
          </span>
        </q-card-section>
        <q-card-section style="height: 60px;" />
      </template>

      <template v-slot:content v-else>
        <q-card-section class="q-pt-md">
          <span class="card-header-text row" style="cursor: pointer; padding-left: 20px;" @click="$emit('open')">
            <AvatarGroup v-if="commenters?.length" :group="commenters" :limit="2" overlapping :size="20" no-background />
            <span v-if="repliesCount" class="q-pr-xs" >{{ repliesCount }}</span>
            <span v-if="repliesCount" class="comment-action" style="padding-left:5px;">{{ commentOverviewText }}</span>
          </span>
        </q-card-section>
      </template>
    </comment>
    
    


  </div>
</template>
<script>

  import uniqBy from 'lodash.uniqby'
  import Comment from '@/components/Comment.vue'
  import AvatarGroup from '@/components/avatar/AvatarGroup.vue'
  import { mapState } from 'pinia'
  import { useProfileStore } from '@/store/profile'
  import { useRoomStore } from '@/store/room'

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
      isThreadPage () {
        return this.$route.name === 'thread'
      },
      mobile () {
        return this.$q?.screen?.xs || this.$q?.screen.sm
      },
      commenters () {
          return uniqBy(this.comments?.map(message => message?.author), 'id')
            .filter(Boolean)
        },
      rootMessageWidth () {
        return this.mobile ? this.$q?.screen.width : '481.8px'
      },
      commentsWidth () {
        return this.mobile
          ? `${this.$q?.screen.width-60}px`
          : '481.8px'
      },
      rootMessage () {
        return this.thread?.root || this.thread
      },
      mainComment () {
        if (this.showComments) return this.thread
        // NOTE: here we are determining what thread is the "main comment" i.e. the one that is displayed in the front of
        // another if it was a response rather than a post

        // if we are on the thread route, the main comment is always the thread
        if (this.$route.name === 'thread') return this.thread

        // if we are on the profile, the main comment is always either
        // - the thread if the current profile is the author of it
        // - OR the first reply from the current profile
        else if (this.$route.name === 'profile') {
          if (this.activeProfile?.id === this.thread?.author?.id) return this.thread
          return this.thread?.replies.find(message => message?.author?.id === this.activeProfile?.id)
        }

        // OTHERWISE: we do the following when we are on the room home page
        // when the author of the thread is a room member
        if (this.isRoomMember(this.thread?.author?.id)) return this.thread

        // OR the latest reply from any room member
        return [...this.thread?.replies]
          .reverse()
          .find(message => {
            return this.isRoomMember(message?.author?.id)
          })
      },
      mainCommentType () {
       // determine the "action" type of the main comment, whether it was "posted" or "replied"
       if (this.thread?.root) return 'replied'
       
       // if the mainComment is the thread
       return this.thread?.id === this.mainComment?.id ? 'posted' : 'replied'
      },
      isResponse () {
        return this.mainCommentType === 'replied'
      },
      repliesCount () {
        return this.comments?.length || this.rootMessage?.replies?.length
      },
      commentOverviewText () {
        let prependedText = ''

        if (this.isResponse) prependedText = 'other'
      
        return this.repliesCount === 1
          ? `${prependedText} reply`
          : `${prependedText} replies`
      },
      comments () {
        return this.thread?.replies
          .filter(message => {
            
            if (!this.mainComment) return true
            if (!message?.id) return true

            return message.id !== this.mainComment.id
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
    },
    methods: {
      isRoomMember (memberId) {
        if (!memberId) return false

        return this.activeRoom?.members.find(member => {
          return member?.id && member?.id === memberId
        })
      }
    }
  }
  </script>

<style lang="scss" scoped>
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