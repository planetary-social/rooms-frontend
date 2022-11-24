<template>
  <ModalContainer :open="open" @close="close" width="594px" height="896px">
    <q-item class="q-pt-md">
      <q-item-label class="heading">
        Follow in the app 📲
      </q-item-label>

    </q-item>
    <q-item>
      <q-item-label class="sub-heading">
        @{{ activeRoom?.name }} requires a SSB client to set up your alias, interact with users and make friends!
      </q-item-label>
    </q-item>

  <div class="q-ma-sm q-pa-sm">
    <div class="row">
      <div class="col-4">
        <q-avatar square size="150px">
          <!-- TODO: QR CODE -->
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect width="150" height="150" rx="15" fill="url(#pattern1231123)"/>
          <defs>
          <pattern id="pattern1231123" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlink:href="#image0_3494_37960" transform="scale(0.00333333)"/>
          </pattern>
          <image id="image0_3494_37960" width="300" height="300" xlink:href="data:image/png;base64,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"/>
          </defs>
          </svg>
        </q-avatar>
      </div>
      <div class="col-8 q-pt-sm">
        <div class="row">
          <div class="col-12 q-pl-sm">
            <div class="row">
            <div class="col-12 heading-2">
              {{ title }}
            </div>
            <div class="col-12 sub-heading-2 q-my-sm">
              This will open in your preferred SSB app, where you'll set up your alias like sarah@{{ activeRoom?.name }}
            </div>
            <div class="accent-text q-my-sm">
              What's an SSB app?
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <q-item class="section-background q-ma-md q-pa-md">
    <q-item-section avatar>
      <a class="accent" @click.prevent="copy">
        {{ copied ? 'COPIED' : 'COPY URL' }}
        <q-icon v-if="copied" size="12px" name="done" />
      </a>
    </q-item-section>
    <q-item-section>
      <q-item-label class="sub-heading-2 text-overflow">{{ uri }}</q-item-label>
    </q-item-section>
    <!-- <q-item-se -->
  </q-item>

  <q-item class="q-ma-sm q-pa-sm">
    <q-item-label class="heading-2">
      Not on SSB yet? Download an app!
    </q-item-label>
  </q-item>
    <!-- TODO:  copy URL-->

    <div class="section-background q-ma-md q-pa-md">
      <div class="row">
        <div class="col-2">
          <q-avatar square size="60px">
            <PlanetaryIcon/>
          </q-avatar>
        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-12 q-pl-sm">
              <div class="row">
              <div class="col-12 heading-3 q-pt-sm">
                Planetary <span style="color: #8575A3;">(iOS, macOS)</span>
              </div>
              <div class="col-12 text q-py-sm">
                The peer-to-peer social network where you own your data.
              </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <AppStoreBtn href="https://apps.apple.com/us/app/planetary-app/id1481617318"/>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="section-background q-ma-md q-pa-md q-mt-lg q-pa-none-sm q-ma-none-sm">
      <div class="row">
        <div class="col-2">
          <q-avatar square size="60px">
            <ManyverseIcon/>
          </q-avatar>
        </div>
        <div class="col-10">
          <div class="row">
            <div class="col-12 q-pl-sm">
              <div class="row">
              <div class="col-12 heading-3 q-pt-sm">
                Manyverse <span style="color: #8575A3;">(Android, iOS, macOS)</span>
              </div>
              <div class="col-12 text q-py-sm">
                Post and share with friends nearby or over the internet.
              </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-auto">
              <AppStoreBtn href="https://apps.apple.com/app/manyverse/id1492321617"/>
            </div>
            <div class="col-auto q-mt-sm">
              <GooglePlayBtn href="https://play.google.com/store/apps/details?id=se.manyver" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalContainer>
</template>

<script>

import { mapState } from 'pinia'
import { useRoomStore } from '@/stores/room'

import ModalContainer from '@/components/modal/ModalContainer.vue'

import PlanetaryIcon from '@/components/icon/PlanetaryIconWithBackground.vue'
import ManyverseIcon from '@/components/icon/ManyverseIcon.vue'

import AppStoreBtn from '@/components/icon/AppStoreBtn.vue'
import GooglePlayBtn from '@/components/icon/GooglePlayBtn.vue'

import { copyToClipboard } from 'quasar'

export default {
  name: 'FollowModal',
  props: {
    open: Boolean,
    title: String,
    uri: String
  },
  components: {
    ModalContainer,
    PlanetaryIcon,
    ManyverseIcon,
    AppStoreBtn,
    GooglePlayBtn
  },
  data () {
    return {
      copied: false
    }
  },
  computed: {
    ...mapState(useRoomStore, ['activeRoom'])
  },
  methods: {
    copy () {
      copyToClipboard(this.uri)
        .then(() => {
          this.copied = true
        })
        .catch(() => {
          // fail
          this.copied = false
        })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
/* Name */

.text-overflow {
  white-space:nowrap;
  overflow:scroll;
}

.heading {
  /* font-family: 'SF Pro Text'; */
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 100%;
  /* identical to box height, or 30px */

  color: #FFFFFF;
}

.heading-2 {
  /* font-family: 'SF Pro Text'; */
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 100%;
  /* identical to box height, or 30px */

  color: #FFFFFF;
}

.heading-3 {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  color: #FFFFFF;
}

.sub-heading {
  /* font-family: 'SF Pro Text'; */
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 120%;
  /* or 24px */
  letter-spacing: -0.174603px;

  /* Secondary--dark */
  color: #8575A3;
}

.sub-heading-2 {
  /* font-family: 'SF Pro Text'; */
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  /* or 22px */
  letter-spacing: -0.174603px;

  /* Secondary--dark */
  color: #8575A3;
}

.text {
/* font-family: 'SF Pro Text'; */
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 120%;
/* identical to box height, or 17px */
letter-spacing: -0.174603px;

/* Primary--dark */
color: #FFFFFF;
}

.accent {
  /* background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  text-decoration: none; */
  padding: 7px;
  cursor: pointer;


  /* Accent */
  background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;

  /* Bio */

  /* font-family: 'SF Pro Text'; */
  font-style: normal;
  font-weight: 600;
  font-size: 9px;
  line-height: 120%;
  /* identical to box height, or 11px */

  /* Primary--dark */
  color: #FFFFFF;
}

.accent-text {
  /* Bio */
  /* font-family: 'SF Pro Text'; */
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  /* identical to box height, or 22px */
  letter-spacing: -0.174603px;
  cursor: pointer;

  /* Accent */
  background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.section-background {
  background: #2B1D44 !important;
  box-shadow: 0px 1px 0px #402B65, inset 0px 1px 0px #201633 !important;
  border-radius: 15px !important;
}

</style>