<template>
  <div :class="overlapping ? 'container' : ''" :style="`width: ${overlapping ? '57px' : ''}`">
    <q-avatar
      v-for="(profile, i) in group" :key="profile?.id" 
      @click.stop="$emit('click', profile)"
      :text="profile?.name"
      :size="size + 'px'"
      :style="`margin-right:${isLastItem(i) ? '' : overlap};`"
      contain
    >
      <q-img :src="profile?.image" :placeholder-src="defaultAvatar" :style="avatarSize"/>
    </q-avatar>
  </div>
</template>

<script>
  import defaultAvatar from '@/assets/avatar.png'

  export default {
    name: 'AvatarGroup',
    props: {
      group: Array,
      overlapping: Boolean,
      size: {
        type: Number,
        default: 60
      }
    },
    computed: {
      avatarSize () {
        return {
          width: this.size + 'px',
          height: this.size + 'px'
        }
      },
      overlap () {
        if (!this.overlapping) return '15px'
        

        return -(this.size/4) + 'px'
      },
      defaultAvatar () {
        return defaultAvatar
      }
    },
    methods: {
      getImage (profile) {
        return profile?.image || this.defaultAvatar
      },
      isLastItem (i) {
        return i === (this.group.length - 1)
      }
    }
  }
</script>

<style scoped>

.avatar {
  cursor: pointer;
  border-radius: 139.358px;
  /* border: 5px solid transparent; */
}

.container {
  background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
  border-radius: 139.358px;
  padding: 2px;
}
</style>
