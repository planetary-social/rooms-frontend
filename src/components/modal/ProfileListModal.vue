<template>
  <ModalContainer :open="open" @close="$emit('close')">
    <div class="header">
      <span class="count-header">{{ profiles.length }}</span> <span>{{ title }}</span>
    </div>
    <q-separator spaced />
    <q-list>
      <q-item v-for="profile in profiles" :key="profile.id">
        <q-item-section avatar>
          <q-avatar size="90px">
            <q-img :src="profile.image" loading="eager" no-spinner :placeholder-src="defaultAvatar" contain class="avatar"/>
          </q-avatar>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1" class="profile-header">{{ profile.name }}</q-item-label>
          <q-item-label lines="2" class="profile-description">{{ profile.description }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <a class="accent q-pa-sm q-px-md">
            <PersonAddIcon/>
            <span class="button-text">Follow</span>
          </a>
        </q-item-section>
      </q-item>
      <q-separator spaced />
      
    </q-list>
  </ModalContainer>
</template>

<script>
import ModalContainer from '@/components/modal/ModalContainer.vue'
import PersonAddIcon from '@/components/icon/PersonAddIcon.vue'
import defaultAvatar from '@/assets/avatar.png'

export default {
  name: 'ProfileListModal',
  props: {
    open: Boolean,
    profiles: Array,
    title: String
  },
  components: {
    ModalContainer,
    PersonAddIcon
  },
  computed: {
    defaultAvatar () {
      return defaultAvatar
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
</style>