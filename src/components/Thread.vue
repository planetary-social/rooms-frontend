<template>
  <div class="q-my-md">
    <!-- the root message in the thread -->

    <!--
      If the author of the rootMessage is not the author,
      then we display it differently and display the first message
      from the activeProfile (if there is one...) or the first message from a member
    -->
    <comment :comment="rootMessage" :action="isFromMember ? 'posted' : ''" :width="rootMessageWidth" :height="rootMessageHeight" :preview="!isFromMember" :comments="comments"/>
    <comment v-if="(!isFromMember)" :comment="latestMemberMessage" action="replied" :style="{'margin-top': '-18px' }" top-shadow/>
    
  
    <!-- comments on the thread -->
    <!-- <q-card-section class="q-px-none">
      <comment
        v-for="comment in viewableComments"
        :key="comment.id"
        :comment="comment"
        action="replied"
        class="q-py-md"
      />
    </q-card-section> -->
    
    <!-- TODO: how to display hidden comments -->
    <!-- <q-card-section v-if="hiddenComments.length"  class="light-text text-center">
      {{ hiddenComments?.length }} hidden replies
    </q-card-section> -->
  </div>
</template>
<script>
  import Comment from '@/components/Comment.vue'
  import { mapState } from 'pinia'
  import { useProfileStore } from '@/stores/profile'
import { useRoomStore } from '../stores/room'

  export default {
    props: {
      thread: Object
    },
    components: {
      Comment
    },
    computed: { 
      ...mapState(useProfileStore, ['activeProfile']),
      ...mapState(useRoomStore, ['activeRoom']),
      cardStyle () {
        return {
          // width: this.$q?.screen?.xs
          //   ? `${this.$q?.screen.width-25}px`
          //   : this.isFromMember ? '535.89px' : '481.8px',
          // margin: 'auto'
        }
      },
      mobile () {
        return this.$q?.screen?.xs || this.$q?.screen.sm
      },
      rootMessageWidth () {
        return this.mobile
          ? `${this.$q?.screen.width-(this.isFromMember ? 25 : 60)}px`
          : this.isFromMember ? '535.89px' : '481.8px'
      },
      rootMessageHeight () {
        if (this.isFromMember) return

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
</style>