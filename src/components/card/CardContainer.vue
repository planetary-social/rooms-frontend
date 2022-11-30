<template>
  <q-card :class="cardClasses" :style="cardStyle" dark :flat="flat" >
    <slot />
  </q-card>
</template>

<script>
export default {
  name: "CardContainer",
  props: {
    comment: Object,
    flat: Boolean,
    action: String,
    width: String,
    height: String,
    maxHeight: String
  },
  computed: {
    cardStyle () {
      return {
        width: this.width,
        height: this.height,
        maxHeight: this.maxHeight
      }
    },
    cardClasses () {
      return {
        'q-ma-md': !this.flat,
        'comment-card': !this.flat,
        'flat-comment-card': this.flat
      }
    }
  }
}

</script>

<style lang="scss" scoped>
  .comment-card {
    /* Cell--dark */
    background: linear-gradient(180deg, #3D2961 0%, #332251 100%);
    box-shadow: 0px 6.21326px 0px #2C1D45, 0px 30px 20px rgba(0, 0, 0, 0.15);
    border-radius: 31.0663px;

    padding: 0;
  }

  // background styling in parent component
  .flat-comment-card {
    background: none;
  }
</style>