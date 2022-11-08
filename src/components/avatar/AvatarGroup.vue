<template>
  <div>
    <q-avatar size="60px" v-for="profile in group" :key="profile?.id" @click="$emit('click', profile)" :text="profile?.name" style="margin-right:15px;">
      <q-img :src="profile?.image" :placeholder-src="defaultImage" :class="classes"/>
      <q-tooltip
          transition-show="scale"
          transition-hide="scale"
        >
        {{ profile?.name }}
      </q-tooltip>
    </q-avatar>
  </div>
</template>

<script>
  import profileIcon from '@/assets/logo.svg'

  export default {
    name: 'AvatarGroup',
    props: {
      group: Array,
      overlapping: Boolean
    },
    computed: {
      classes () {
        return {
          overlapping: this.overlapping,
          'small-avatar': true
        }
      },
      defaultImage () {
        return profileIcon
      }
    },
    methods: {
      getImage (profile) {
        return profile?.image || this.defaultImage
      }
    }
  }
</script>

<style scoped>
.overlapping {
  border: 2px solid white;
  position: absolute;
}

.small-avatar {
  cursor: pointer;
  border-radius: 139.358px;
  border: 5px solid transparent;
  width: 60px;
  height: 60px;
}
</style>
