<template>
  <canvas ref="canvas" class="canvas"></canvas>
</template>

<script>
import logo from '@/assets/planetary-logo-with-background.svg'
import { QRCodeBrowser } from "@qrcode-js/browser";

export default {
  name: 'QRCode',
  props: {
    uri: String
  },
  async mounted () {
    const canvasElement = this.$refs.canvas

    const qrCode = QRCodeBrowser(canvasElement);
    qrCode.setOptions({
      text: this.uri,
      size: 150,
      color: 'black',
      background: {
        colorAbove: 'white',
        colorBelow: 'white'
        // image?: Union;
      },
      finder: {
        round: 0.5,
      },
      logo: {
        image: logo,
        margin: 0,
        scale: 0.2,
        round: 0.5
      },
      margin: {
        size: 20
      },
      drawFunction: "telegram"
    })
    qrCode.draw()
  }
}
</script>

<style lang="scss">
.canvas {
  border-radius: 15px;
}
</style>