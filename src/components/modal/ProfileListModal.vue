<template>
  <ModalContainer :open="open" @close="$emit('close')" max-height="896px">
    <div class="header q-ma-lg">
      <span class="count-header">{{ profiles.length }}</span> <span>{{ title }}</span>
    </div>
    <q-separator spaced class="divider" />
    <q-list>
      <div v-for="(profile, i) in profiles" :key="profile.id">
        <q-item class="q-pa-md">
          <q-item-section avatar @click="goProfile(profile)" style="cursor: pointer;">
            <q-avatar size="90px">
              <q-img :src="profile.image" loading="eager" no-spinner :placeholder-src="defaultAvatar" contain class="avatar"/>
            </q-avatar>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1" class="profile-header" @click="goProfile(profile)" style="cursor: pointer;">{{ profile.name }}</q-item-label>
            <q-item-label lines="2" class="profile-description">{{ profile.description }}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <a class="accent q-pa-sm q-px-md" @click.prevent="openFollowModal(profile)">
              <PersonAddIcon/>
              <span class="button-text">Follow</span>
            </a>
          </q-item-section>
        </q-item>
        <q-separator v-if="!isLastItem(i)" class="divider"/>
      </div>
    </q-list>
    <FollowPersonModal
      v-if="isFollowModalOpen"
      
      :open="isFollowModalOpen"
      title="Scan to follow this user"
      :uri="profile?.ssbURI" 
      :image="profile?.image" 
      
      @close="closeModal"
    />
  </ModalContainer>
</template>

<script>
import { mapActions } from 'pinia'

import FollowPersonModal from '@/components/modal/FollowModal.vue'

import ModalContainer from '@/components/modal/ModalContainer.vue'
import PersonAddIcon from '@/components/icon/PersonAddIcon.vue'
import defaultAvatar from '@/assets/avatar.png'

import { useProfileStore } from '@/stores/profile'

const FOLLOW = 'follow'

export default {
  name: 'ProfileListModal',
  props: {
    open: Boolean,
    profiles: Array,
    title: String
  },
  components: {
    ModalContainer,
    PersonAddIcon,
    FollowPersonModal
  },
  data () {
    return {
      modal: null,
      profile: null
    }
  },
  computed: {
    defaultAvatar () {
      return defaultAvatar
    },
    isFollowModalOpen () {
      return this.modal === FOLLOW && this.profile != null
    }
  },
  methods: {
    ...mapActions(useProfileStore, ['setActiveProfile']),
    isLastItem (i) {
      return i === (this.profiles?.length - 1)
    },
    goProfile (profile) {
      if (!profile.id) return
      window.scrollTo(0, 0)

      // if we are already on this persons profile, then just scroll to the top and close the modal
      if (profile.id === this.activeProfile?.id) {
        this.$emit('close')
        return
      }

      // set the active profile as the authors
      this.setActiveProfile(profile)
      
      // go to their profile
      this.$router.push({ name: 'profile', params: { feedId: profile.id }})
    },
    openFollowModal (profile) {
      this.profile = profile
      this.modal = FOLLOW
    },
    closeModal () {
      this.profile = null
      this.modal = null
    }
  }
}
</script>

<style scoped>
.header {
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 100%;
  color: #8575A3;
}

.count-header {
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 100%;
  color: #FFFFFF;
}

.avatar {
  border-radius: 139.358px;
  background: 
    linear-gradient(var(--color-background), var(--color-background)) padding-box,
    linear-gradient(to right, #F08508, #F43F75) border-box;
  border: 3px solid transparent;
  width: 90px;
  height: 90px;
}

.accent  {
  background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
  text-decoration: none;
  border-radius: 25.2484px;
  filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.1));
  cursor: pointer;
}

.button-text {
  font-style: normal;
  font-weight: 500;
  font-size: 19.3243px;
  line-height: 23px;
  padding-left: 10px;
  color: #FFFFFF;
}

.profile-header {
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 100%;
  color: #FFFFFF;
}

.profile-description {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 128%;
  /* or 20px */

  /* Secondary--dark */
  color: #8575A3;

  /* Filter bar text --dark */
  text-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}

.divider {
  height: 0px;
  border: 0.5px solid #271A3D;
  box-shadow: 0px 1.55331px 0px #4A3275;
}
</style>