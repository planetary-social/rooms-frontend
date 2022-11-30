<template>
  <q-dialog v-model="open" @hide="close">
    <CardContainer :width="width" :height="height" :max-height="maxHeight" class="q-pa-md q-pt-lg q-px-lg q-pa-none-sm q-ma-none-sm">
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
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
