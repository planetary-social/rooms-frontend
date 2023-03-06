<template>
  <q-card :style="cardStyle" dark flat class="card">
    <q-item>
      <q-item-section avatar>
        <q-avatar size="120px">
          <q-img :src="image" loading="eager" no-spinner :placeholder-src="defaultRoomAvatar" class="avatar"/>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="title">{{ room?.name }}</q-item-label>
        <!-- <q-item-label class="subtext" style="color: #FFFAF9;" caption> -->
          <!-- TODO -->
          <!-- <span>dev</span>
          <span style="color: #8575A3;">@{{ room?.name }}</span>
        </q-item-label> -->
        <q-item class="q-px-none" v-if="httpInviteLink">
          <a class="accent q-pa-sm q-px-md" @click.prevent="openJoinModal">
            <PersonAddIcon/>
            <span class="button-text">Join in app</span>
          </a>
        </q-item>
      </q-item-section>
    </q-item>
    <div class="scrollContainer" :style="scrollStyle">
      <q-item>
        <q-item-section>
          <q-item-label class="description-text">
            <Markdown v-if="room?.description" :text="room?.description"/>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="subheader">
        Room Stats
      </q-item>
      <div class="row justify-start q-pb-lg">
        <div class="q-pl-lg" @click="openMembersModal" style="cursor: pointer;">
          <q-item-section class="q-ml-sm" >
            <AvatarGroup :group="room?.members" :limit="2" overlapping :size="30" @click="openMembersModal"/>
          </q-item-section>
          <q-item-label class="stats-header" caption>
            {{ room.members?.length || 'N/A' }}
          </q-item-label>
          <q-item-label class="stats" caption>
            members
          </q-item-label>
        </div>
        <!-- <q-item-section>
          <q-item-label class="stats-header" caption>
            {{ room?.followingCount || 'N/A' }}
          </q-item-label>
          <q-item-label class="stats" caption>
            following
          </q-item-label>
        </q-item-section> -->
        <!-- <q-item-section>
          <q-item-label class="stats-header" caption>
            N/A
          </q-item-label>
          <q-item-label class="stats" caption>
            ignored by
          </q-item-label>
        </q-item-section> -->
        <!-- <q-item-section>
          <q-item-label class="stats-header" caption>
            N/A
          </q-item-label>
          <q-item-label class="stats" caption>
            posts
          </q-item-label>
        </q-item-section> -->
      </div>
      <!-- <q-item class="subheader">
        Hot Topics
      </q-item>
      <q-item class="column">
        <div>
          <q-btn class="q-mx-sm q-my-xs gradient-button" disabled v-for="i in 4" :key="i" flat>
            <span class="gradient-text">{{ `#testing${i}` }}</span>
          </q-btn>
        </div>
      </q-item> -->
      <q-item class="subheader">
        Newest Public Members
      </q-item>
      <q-item class="content-start">
        <AvatarGroup :group="room.members" @click="goProfile" />
      </q-item>
    </div>
    <ProfileListModal
      v-if="isMembersModal"
    
      :open="isMembersModal"
      :getProfiles="getProfiles"
      title="members"
      
      @close="closeModal"
    />
    <JoinRoomModal
      v-if="isJoinModal"
      
      :httpInviteLink="httpInviteLink"
      :backupBtnLink="backupBtnLink"

      :open="isJoinModal"
      title="join this room"
      @close="closeModal"
    />
  </q-card>
</template>



<script>
import { mapActions } from 'pinia'

import { useProfileStore } from '@/store/profile'
import { useRoomStore } from '@/store/room'

import ProfileListModal from '@/components/modal/ProfileListModal.vue'
import Markdown from '@/components/Markdown.vue'
import PersonAddIcon from '@/components/icon/PersonAddIcon.vue'
import AvatarGroup from '@/components/avatar/AvatarGroup.vue'

import defaultRoomAvatar from '@/assets/room.svg'
import JoinRoomModal from '@/components/modal/FollowModal.vue'

const JOIN = 'join'
const MEMBERS = 'members'

  export default {
    name: "RoomOverview",
    props: {
      room: Object
    },
    components: {
      Markdown,
      PersonAddIcon,
      AvatarGroup,
      JoinRoomModal,
      ProfileListModal
    },
    data () {
      return {
        modal: null,
        httpInviteLink: null
      }
    },
    async mounted () {
      this.httpInviteLink = await this.getInviteCode()
    },
    computed: {
      mobile () {
        return this.$q.screen.xs || this.$q.screen.sm
      },
      cardStyle () {
        return {
          width: this.mobile
            ? `${this.$q?.screen.width-25}px`
            : '535.89px'
        }
      },
      scrollStyle () {
        return {
          height: this.mobile ? 'auto' : '70vh',
          overflow: 'auto'
        }
      },
      defaultRoomAvatar () {
        return defaultRoomAvatar
      },
      image () {
        return this.room?.image || this.defaultRoomAvatar
      },
      isJoinModal () {
        return this.modal === JOIN
      },
      isMembersModal () {
        return this.modal === MEMBERS
      },
      token () {
        if (!this.httpInviteLink) return

        // get the token from the invite code
        const url = new URL(this.httpInviteLink)
        const searchParams = url.searchParams

        return searchParams.get('token')
      },
      backupBtnLink () {
        if (!this.token) return
  
        const url = new URL('ssb:experimental')
        const searchParams = url.searchParams

        searchParams.set('action', 'claim-http-invite')
        searchParams.set('invite', this.token)
        searchParams.set('postTo', this.room?.url + '/invite/consume')

        return url.href
      }
    },

    methods: {
      ...mapActions(useProfileStore, ['setActiveProfile']),
      ...mapActions(useRoomStore, ['getInviteCode']),
      goProfile (member) {
        window.scrollTo(0, 0)
        this.setActiveProfile(member)
        this.$router.push({ name: 'profile', params: { feedId: member.id } })
      },
      openMembersModal () {
        this.modal = MEMBERS
      },
      closeModal () {
        this.modal = null
      },
      openJoinModal () {
        this.modal = JOIN
      },
      getProfiles () {
        return new Promise((resolve) => resolve(this.room?.members))
      }
    }
  }
</script>

<style scoped>
  .card {
    background: none;
    /* Cell--dark */
    /* background: linear-gradient(180deg, #3D2961 0%, #332251 60.72%); */
    /* box-shadow: 0px 4px 0px #2C1D45, 0px 4px 10px rgba(0, 0, 0, 0.25); */
    /* border-radius: 20px; */
  }

  .scrollContainer::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollContainer {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  .title {
    /* Name */

    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 100%;
    /* identical to box height, or 30px */

    color: #FFFFFF;
  }

  .description-text {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 120%;
    /* or 24px */
    letter-spacing: -0.174603px;

    color: #FFFFFF;
    word-wrap: break-word;
  }

  .subtext {
    font-family: 'SF Pro Text';
    font-size: 20px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.1746031790971756px;
    text-align: left;
  }

  .stats-header {
    font-family: 'SF Pro Text';
    font-size: 39px;
    font-weight: 400;
    line-height: 62px;
    letter-spacing: -0.14864864945411682px;
    text-align: center;
    color: #FFFFFF;
  }

  .stats {
    font-family: 'SF Pro Text';
    font-size: 18px;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: -0.14864864945411682px;
    text-align: center;
    color: #8575A3;
  }

  .accent  {
    background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
    border: 2.97297px solid #231837;
    text-decoration: none;
    border-radius: 25.2484px;
    cursor: pointer;
  }

  .button-text {
    height: 23px;

    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 19.3243px;
    line-height: 23px;
    /* identical to box height */

    color: #FFFFFF;
    padding-left: 10px;
  }

  .gradient-button {
    background: 
      linear-gradient(var(--color-background), var(--color-background)) padding-box,
      linear-gradient(to right, #F08508, #F43F75) border-box;
    border-radius: 147.16px;
    border: 1px solid transparent;
    /* opacity: 0.9; */
  }

  .gradient-text {
    background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .avatar {
    border-radius: 139.358px;
    background: 
      linear-gradient(var(--color-background), var(--color-background)) padding-box,
      linear-gradient(to right, #F08508, #F43F75) border-box;
    border: 5px solid transparent;
    width: 120px;
    height: 120px;
  }

  .subheader {
    /* Following */

    height: 24px;

    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    /* identical to box height, or 24px */
    letter-spacing: -0.174603px;

    color: #FFFFFF;
  }


</style>