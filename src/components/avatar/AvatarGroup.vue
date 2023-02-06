<template>
  <div :class="overlapping && !noBackground ? 'container' : ''" :style="`width: ${overlappingWidth};`">
    <q-avatar
      v-for="(profile, i) in profiles" :key="profile?.id" 
      @click.stop="$emit('click', profile)"
      :text="profile?.name"
      :size="size + 'px'"
      :style="`margin-right:${isLastItem(i) ? '' : avatarMargins}; margin-bottom: ${overlapping ? null : avatarMargins};`"
      contain
    >
      <q-img :src="profile?.image || defaultAvatar" :placeholder-src="defaultAvatar" no-spinner :style="avatarStyle"/>
    </q-avatar>
  </div>
</template>

<script>
  import defaultAvatar from '@/assets/avatar.svg'

  export default {
    name: 'AvatarGroup',
    props: {
      group: Array,
      overlapping: Boolean,
      size: {
        type: Number,
        default: 60
      },
      limit: Number,
      noBackground: Boolean
    },
    computed: {
      profiles () {
        if (!this.updatedLimit) return this.group

        return this.group?.slice(0, this.updatedLimit)
      },
      overlappingWidth () {
        if (!this.overlapping) return
        if (this.group?.length === 1) return '30px'

        return '57px'
      },
      avatarStyle () {
        return {
          width: this.size + 'px',
          height: this.size + 'px',
          cursor: this.overlapping ? '' : 'pointer'
        }
      },
      avatarMargins () {
        if (!this.overlapping) return '15px'
        

        return -(this.size/4) + 'px'
      },
      defaultAvatar () {
        return defaultAvatar
      },
      updatedLimit () {
        return (this.limit && this.limit > this.group?.length) ? this.group?.length : this.limit
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
