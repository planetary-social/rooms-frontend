<template>
  <q-card :class="cardClasses" :style="cardStyle" dark :flat="flat" @click="$emit('open')" style="cursor: pointer;">
    <q-item class="card-header">
      <q-item-section avatar @click="goProfile" style="cursor: pointer;">
        <q-avatar size="37.28px" class="avatar">
          <q-img :src="image" loading="eager" no-spinner :placeholder-src="defaultAvatar" contain width="37.28px" height="37.28px" />
        </q-avatar>
      </q-item-section>

      <q-item-section no-wrap>
        <q-item-label class="card-header-text">
          <span class="q-pr-xs" style="cursor: pointer;" @click="goProfile">{{ author?.name || randomFeedId() }}</span>
          <span class="comment-action">{{ action }} {{ isHiddenContent ? 'posted' : '' }}</span>
        </q-item-label>
        <!-- <q-item-label class="light-text" style="left: -10px;" caption>
          {{ timestamp }}
        </q-item-label> -->
      </q-item-section>

      <!-- <q-item-section side class="comment-action">
        <q-icon size="40px" name="more_horiz" />
      </q-item-section> -->
    </q-item>

    <q-separator class="top-divider" />

    <q-card-section v-if="isHiddenContent" class="light-text text-center hidden-text">
      <span v-if="mobile">
        This message is hidden...
      </span>
      <span v-else>
        This message is hidden because the <br/>
        user's profile and information are private
      </span>
    </q-card-section>
    <q-card-section v-else-if="comment?.text" class="text q-py-none" :class="{ 'comment-action': preview, 'light-text': !preview }">
      <Markdown :text="comment.text" :preview="preview"/>
    </q-card-section>


    <q-separator v-if="!preview && !flat && (reactions?.length || comments?.length)" class="bottom-divider"/>

    <q-card-section v-if="!preview && reactions?.length" :style="`height: ${comments?.length ? '' : '77.67px'}; margin-left: 7px;`">
      <Reactions  v-if="!preview && reactions?.length" :reactions="reactions"/>
    </q-card-section>
  
    <q-card-section v-if="(!preview && !flat && comments?.length)" class="q-pt-md">
      <span class="card-header-text row" style="cursor: pointer; padding-left: 20px;" @click="$emit('open')">
        <AvatarGroup v-if="commenters?.length" :group="commenters" :limit="2" overlapping :size="20" no-background />
        <span class="q-pr-xs">{{ comments?.length }}</span>
        <span class="comment-action" style="padding-left:5px;">{{ comments.length === 1 ? 'reply' : 'replies' }}</span>
      </span>
    </q-card-section>
  </q-card>
</template>



<script>
import uniqBy from 'lodash.uniqby'
import { mapState, mapActions } from 'pinia'

import Markdown from './Markdown.vue'
import Reactions from './Reactions.vue'
import AvatarGroup from './avatar/AvatarGroup.vue'
import { useProfileStore } from '@/stores/profile'

import defaultAvatar from '@/assets/avatar.svg'

  export default {
    name: "Comment",
    components: {
      Markdown,
      Reactions,
      AvatarGroup
    },
    props: {
        comment: Object,
        flat: Boolean,
        action: String,
        width: String,
        preview: Boolean,
        height: String,
        topShadow: Boolean,
        comments: Array,
        marginTop: String
    },
    computed: {
        ...mapState(useProfileStore, ['activeProfile']),
        mobile () {
          return this.$q?.screen.xs || this.$q?.screen.sm
        },
        linesLimit () {
          return this.preview ? 2 : null
        },
        cardClasses () {
          return {
            'q-ma-md': !this.flat,
            'comment-card': !this.flat,
            'flat-comment-card': this.flat
          }
        },
        flatStyle () {
          return {
            background: '#2B1D44',
            'padding-top': '10px'
          }
        },
        cardStyle () {
          return {
            width: this.width,
            height: this.height,
            margin: 'auto',
            background: '#3D2961',
            'box-shadow': this.topShadow ? '0px -20px 30px -15px #2C1D45' : null,
            '-webkit-box-shadow': this.topShadow ? '0px -20px 30px -15px #2C1D45' : null,
            // 'box-shadow': '0px 6.21326px 0px #2C1D45, 0px 6.21326px 15.5331px rgba(0, 0, 0, 0.25)',
            // 'border-radius': '31.0663px'

            'border-top-left-radius': this.flat ? '25px' : null,
            'border-top-right-radius': this.flat ? '25px' : null,
            'margin-top': this.marginTop
          }
        },
        commenters () {
          return uniqBy(this.comments?.map(message => message?.author), 'id')
            .filter(Boolean)
        },
        reactions () {
          return this.comment?.votes
        },
        isHiddenContent() {
          return this.comment?.id === null
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
      },
      randomFeedId () {
        var randomChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
        var result = '';
        for ( var i = 0; i < 8; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return '@' + result
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
    background: #3D2961;
  }

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

  .comment-card {
    

    box-shadow:
      0px 6.21326px 0px #2C1D45,
      0px 6.21326px 15.5331px rgba(0, 0, 0, 0.25);

    -webkit-box-shadow:
      0px 6.21326px 0px #2C1D45,
      0px 6.21326px 15.5331px rgba(0, 0, 0, 0.25);


    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.07) 100%);
    background-blend-mode: overlay;
    border-radius: 31.0663px;
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

    border: 0.97px solid #271A3D;
    background-color: #271A3D;
    box-shadow: 0px 1.55331px 0px #4A3275;
    -webkit-box-shadow: 0px 1.55331px 0px #4A3275;
    // color: white;
  }

  .bottom-divider {
    height: 0px;

    border: 0.97px solid #271A3D;
    background-color: #271A3D;
    box-shadow: 0px 1.55331px 0px #4A3275;
    -webkit-box-shadow: 0px 1.55331px 0px #4A3275;
  }

  .avatar {
    width: 37.28px;
    height: 37.28px;
  }

  .hidden-text {
    font-size: 20px;
    font-weight: 400;
    line-height: 31px;
    letter-spacing: 0px;
    font-family: 'SF Pro Text';
  }
</style>