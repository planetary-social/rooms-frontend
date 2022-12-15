<template>
  <q-card :style="cardStyle" dark flat class="card">
    <q-item>
      <q-item-section avatar>
        <q-avatar size="120px">
          <q-img :src="image" loading="eager" no-spinner :placeholder-src="defaultAvatar" contain class="avatar"/>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="title">{{ profile?.name }}</q-item-label>
        <q-item-label v-if="profile?.aliases?.length" class="subtext" style="color: #FFFAF9;" caption>
          <span>{{ profile.aliases[0] }}</span>
          <span style="color: #8575A3;">@{{ activeRoom?.name }}</span>
        </q-item-label>
        <q-item v-if="httpLink" class="q-px-none">
          <a class="accent q-pa-sm q-px-md" @click.prevent="openFollowModal">
            <PersonAddIcon/>
            <span class="button-text">Follow</span>
          </a>
        </q-item>
      </q-item-section>
    </q-item>

    <div class="scrollContainer" :style="scrollStyle">
      <q-item>
        <q-item-section>
          <q-item-label class="description-text">
            <Markdown v-if="profile?.description" :text="profile?.description"/>
          </q-item-label>
        </q-item-section>
      </q-item>
      <!-- <q-item>
        Last Active: N/A
      </q-item> -->
      <div v-if="profile?.followers?.length" class="row justify-start q-pb-lg" style="cursor: pointer;" @click="openFollowers">
        <div class="q-pl-lg">
          <q-item-section class="q-ml-sm" style="cursor: pointer;">
            <AvatarGroup :group="profile?.followers" :limit="2" overlapping :size="30" @click="openFollowers" />
          </q-item-section>
          <q-item-label class="stats-header" caption>
            {{ profile?.followersCount }}
          </q-item-label>
          <q-item-label class="stats" caption>
            followers
          </q-item-label>
        </div>
        <div v-if="profile?.following?.length" class="q-ml-lg" style="cursor: pointer;" @click="openFollowing">
          <q-item-section class="q-ml-sm">
            <AvatarGroup :group="profile?.following" :limit="2" overlapping :size="30" @click="openFollowing" />
          </q-item-section>
          <q-item-label class="stats-header" caption>
            {{ profile?.followingCount }}
          </q-item-label>
          <q-item-label class="stats" caption>
            following
          </q-item-label>
        </div>
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
          rooms
        </q-item-label>
      </q-item-section> -->
      </div>
    </div>
    <!-- <q-item class="column">
      <div class="col-12">
        Active On: TODO
      </div>
      <div>
        <q-btn class="q-mx-sm q-my-xs gradient-button" disabled v-for="i in 20" :key="i" flat>
          <span class="gradient-text">{{ `#testing${i}` }}</span>
        </q-btn>
      </div>
    </q-item> -->
    <ProfileListModal
      v-if="isListModal"
    
      :open="isListModal"
      :profiles="listModalProfiles"
      :title="listModalTitle"
      
      @close="closeModal"
    />
    <FollowPersonModal
      v-if="isFollowModalOpen"
      
      :open="isFollowModalOpen"
      title="follow this user"

      :httpInviteLink="httpLink"
      :backupBtnLink="profile?.ssbURI"

      :image="profile?.image" 
      
      @close="closeModal"
    />
    
  </q-card>
</template>



<script>
import FollowPersonModal from '@/components/modal/FollowModal.vue'
import ProfileListModal from '@/components/modal/ProfileListModal.vue'

import AvatarGroup from '@/components/avatar/AvatarGroup.vue'
import Markdown from '@/components/Markdown.vue'
import defaultAvatar from '@/assets/avatar.svg'
import PersonAddIcon from '@/components/icon/PersonAddIcon.vue'
import { mapState } from 'pinia'
import { useRoomStore } from '../store/room'

const FOLLOW = 'follow'
const FOLLOWERS = 'followers'
const FOLLOWING = 'following'

  export default {
    name: "ProfileOverview",
    props: {
      profile: Object
    },
    components: {
      FollowPersonModal,
      ProfileListModal,
      Markdown,
      PersonAddIcon,
      AvatarGroup
    },
    data () {
      return {
        modal: null
      }
    },
    computed: {
      ...mapState(useRoomStore, ['activeRoom']),
      mobile () {
        return this.$q.screen.xs || this.$q.screen.sm
      },
      httpLink () {
        return `${window.location.origin}/follow/${this.profile?.id}`
      },
      scrollStyle () {
        return {
          height: this.mobile ? 'auto' : '70vh',
          overflow: 'auto'
        }
      },
      isFollowModalOpen () {
        return this.modal === FOLLOW
      },
      isListModal () {
        return this.modal === FOLLOWERS || this.modal === FOLLOWING
      },
      listModalTitle () {
        if (!this.isListModal) return
        
        return this.modal === FOLLOWERS
          ? FOLLOWERS
          : FOLLOWING
      },
      listModalProfiles () {
        if (!this.isListModal) return []

        return this.modal === FOLLOWERS
          ? this.profile?.followers || []
          : this.profile?.following || []
      },
      cardStyle () {
        return {
          width: this.$q?.screen?.xs
            ? `${this.$q?.screen.width-25}px`
            : '535.89px'
        }
      },
      defaultAvatar () {
        return defaultAvatar
      },
      image () {
        return this.profile?.image || this.defaultAvatar
      },
      httpInviteLink () {
        return `${this.activeRoom.url}/profile/${this.profile?.id}?follow=true`
      }
    },
    methods: {
      openFollowModal () {
        this.modal = FOLLOW
      },
      closeModal () {
        this.modal = null
      },
      openFollowers () {
        this.modal = FOLLOWERS
      },
      openFollowing () {
        this.modal = FOLLOWING
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
    text-align: center !important;
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
    cursor: pointer;
    background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
    text-decoration: none;
    border-radius: 25.2484px;
    filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
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

  .scrollContainer::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollContainer {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

</style>