<template>
  <q-dialog v-model="open" @hide="close" :maximized="mobile">
    <CardContainer :width="width" :height="height" :max-height="maxHeight">
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
    height: String,
    maxHeight: String
  },
  components: {
    CardContainer
  },
  computed: {
    mobile () {
      return this.$q.screen.xs || this.$q.screen.sm
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
