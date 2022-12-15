<template>
  <span ref="qrSvg" v-html="qrSvg"/>
</template>

<script>
import logo from '@/assets/planetary-logo-with-background.svg'
import vkQr from '@vkontakte/vk-qr';

export default {
  name: 'QRCode',
  props: {
    uri: String,
    image: String
  },
  data () {
    return {
      qrSvg: null
    }
  },
  async mounted () {
    this.qrSvg = vkQr.createQR(this.uri, {
      qrSize: 150,
      isShowLogo: true,
      backgroundColor: 'white',
      isShowBackground: true,
      foregroundColor: 'black',
      ecc: 3,
      logoData: this.image || logo,
      suffix: 'myqr'
    })
  }
}
</script>
