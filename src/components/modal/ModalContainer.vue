<template>
  <q-dialog v-model="open" @hide="close" :maximized="mobile">
    <CardContainer v-bind="customProps">
      <slot/>
    </CardContainer>
  </q-dialog>
</template>

<script>
import CardContainer from '@/components/card/CardContainer.vue'

export default {
  name: 'ModalContainer',
  props: {
    open: Boolean,

    width: String,
    minWidth: String,

    height: String,
    minHeight: String,
    maxHeight: String
  },
  components: {
    CardContainer
  },
  computed: {
    mobile () {
      return this.$q.screen.xs || this.$q.screen.sm
    },
    customProps () {
      return {
        width: this.width,
        minWidth: this.minWidth,

        height: this.height,
        minHeight: this.minHeight,
        maxHeight: this.maxHeight
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
