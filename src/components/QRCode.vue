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

    // setTimeout(() => {
    //   console.log(document.getElementById('logo-mask-myqr'))
    // }, 1000)
  }
}
</script>

<style lang="scss" scoped>

// .avatar {
//   border-radius: 139.358px;
//   background: 
//     linear-gradient(var(--color-background), var(--color-background)) padding-box,
//     linear-gradient(to right, #F08508, #F43F75) border-box;
//   border: 2px solid transparent;
//   width: 40px;
//   height: 40px;
// }

</style>