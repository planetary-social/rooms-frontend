<template>
  <q-card class="comment-card" :style="cardStyle" dark>
    <slot />
  </q-card>
</template>

<script>
export default {
  name: "CardContainer",
  props: {
    comment: Object,
    action: String,
    width: String,
    minWidth: String,

    height: String,
    minHeight: String,
    maxHeight: String
  },
  computed: {
    cardStyle () {
      return {
        width: this.width,
        minWidth: this.minWidth,
        height: this.height,
        minHeight: this.minHeight,
        maxHeight: this.maxHeight
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
</style>