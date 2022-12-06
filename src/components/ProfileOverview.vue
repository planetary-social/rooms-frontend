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
        <q-item v-if="profile.ssbURI" class="q-px-none">
          <a class="accent q-pa-sm q-px-md" @click.prevent="openFollowModal">
            <PersonAddIcon/>
            <span class="button-text">Follow</span>
          </a>
        </q-item>
      </q-item-section>
    </q-item>

    <q-scroll-area :style="scrollStyle" content-style="height: 0px;">
      <q-item v-if="profile?.description">
        <q-item-section>
          <q-item-label class="description-text">
            <Markdown :text="description"/>
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
    </q-scroll-area>
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
      :uri="profile?.ssbURI" 
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
import defaultAvatar from '@/assets/avatar.png'
import PersonAddIcon from '@/components/icon/PersonAddIcon.vue'
import { mapState } from 'pinia'
import { useRoomStore } from '../stores/room'

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
        modal: null,
        description: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ultrices dignissim enim, a varius mi elementum vel. Suspendisse tempor fermentum lacus. Ut velit dui, posuere quis viverra fringilla, consectetur vitae ante. Nulla ut lacus lacus. Pellentesque vel nibh eu ipsum vehicula iaculis. In vitae augue sed lacus tempus congue ac at augue. Curabitur a faucibus lacus. Vivamus vitae sem diam. Nam erat quam, fringilla a neque in, maximus aliquet massa. Mauris malesuada dolor in metus ullamcorper dapibus. In hac habitasse platea dictumst. Curabitur efficitur augue sit amet massa ornare commodo. Phasellus justo erat, vulputate vitae tempus vel, tristique a turpis. Vestibulum egestas velit a leo bibendum aliquet. Etiam sit amet purus nunc. Fusce dictum libero dolor, sed finibus arcu rutrum eu.

Etiam cursus libero turpis, sed dignissim erat fermentum eget. Phasellus eget ante fringilla augue eleifend vestibulum. Mauris est nisl, viverra id sapien non, aliquam tristique enim. Mauris vel metus et velit pellentesque blandit eu at lacus. Aenean gravida augue in elit volutpat fermentum. Nulla id pellentesque neque. Donec vitae tempus leo. Fusce mollis dui a nunc aliquet, in dictum felis consectetur. Ut placerat elementum ante eget tempus.

Nullam eget scelerisque sapien. In hac habitasse platea dictumst. Vivamus luctus tempus augue, eu euismod ex. Phasellus efficitur lobortis felis, ac ultrices tellus viverra vitae. Duis fermentum, enim nec suscipit convallis, augue turpis accumsan nunc, at rhoncus felis augue gravida libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce maximus sem in est pulvinar, ut mattis urna efficitur. Nullam et consectetur sem. Nulla sollicitudin hendrerit arcu dapibus lobortis. Suspendisse potenti. Quisque euismod ut enim sed elementum.

Sed laoreet vehicula sapien ac dignissim. Aenean tempus est sit amet scelerisque tincidunt. Mauris sit amet dignissim mi. Aliquam et dui est. Sed velit risus, mollis ultrices purus non, tincidunt fermentum sapien. Sed sollicitudin justo diam, ac porttitor purus fringilla eget. Maecenas sodales felis eros, ut condimentum nunc tristique non. Fusce nec faucibus dolor. Proin pretium mauris quis massa auctor, a placerat lorem convallis. Donec semper luctus purus, ac placerat quam luctus sit amet. Nunc et lacus purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus hendrerit magna ut nisi bibendum aliquet.

Vivamus lobortis pharetra lacus, vitae vehicula nisi malesuada sit amet. Proin in tincidunt odio. Ut sagittis eleifend dictum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed venenatis lacinia erat, vel feugiat leo. Fusce eget pretium enim. Duis pellentesque tempor ligula id tincidunt. Donec libero nibh, efficitur tincidunt tristique pulvinar, accumsan semper libero. Aenean mattis orci felis, eget aliquam turpis maximus eget. In et ultrices purus, sed pellentesque mauris. Aliquam sed accumsan ligula, et congue augue. Aliquam erat volutpat. Vivamus sagittis, erat non vulputate porta, erat turpis varius ex, vitae efficitur ligula massa id mauris. Proin laoreet at felis quis consequat.
        `
      }
    },
    computed: {
      ...mapState(useRoomStore, ['activeRoom']),
      mobile () {
        return this.$q.screen.xs || this.$q.screen.sm
      },
      scrollStyle () {
        return {
          height: `calc(100vh - ${this.mobile ? '0px' : '300px'})`
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

    /* font-family: 'SF Pro Text'; */
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 100%;
    /* identical to box height, or 30px */

    color: #FFFFFF;
  }

  .description-text {
    /* font-family: 'SF Pro Text'; */
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

    /* font-family: 'SF Pro Text'; */
    font-style: normal;
    font-weight: 500;
    font-size: 19.3243px;
    line-height: 23px;
    /* identical to box height */

    color: #FFFFFF;
    padding-left: 10px;
  }
  
  .subtext {
    /* font-family: SF Pro Text; */
    font-size: 20px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.1746031790971756px;
    text-align: left;
  }

  .stats-header {
    /* font-family: SF Pro Text; */
    font-size: 39px;
    font-weight: 400;
    line-height: 62px;
    letter-spacing: -0.14864864945411682px;
    text-align: center !important;
    color: #FFFFFF;
  }

  .stats {
    /* font-family: SF Pro Text; */
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


</style>