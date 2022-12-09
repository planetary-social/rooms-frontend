<template>
  <ModalContainer :open="open" @close="close" width="594px" height="896px">
    <div :class="mobile ? 'q-ma-sm' : 'q-ma-md'" :style="mobile ? 'padding-bottom:100px;' : ''">
      <q-item v-if="mobile" class="q-pa-sm">
        <q-space/>
        <q-btn right dense flat icon="close" v-close-popup></q-btn>
      </q-item>
      
      <q-item class="q-pt-md q-mx-md">
        <q-item-section>
          <q-item-label class="heading">
            Follow in the app 📲
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-label class="sub-heading">
          @{{ activeRoom?.name }} requires a SSB client to set up your alias, interact with users and make friends!
        </q-item-label>
      </q-item>

      <q-item v-if="mobile" :class="sectionClass" class="q-py-md">
        <a class="accent2" :href="uri">
          {{ title }}
        </a>
      </q-item>
      <div v-else class="q-ma-sm q-pa-sm">
        <div class="row">
          <div class="col-4">
            <q-avatar square size="150px">
              <QRCode v-if="uri" :uri="uri" :image="image"/>
            </q-avatar>
          </div>
          <div class="col-8 q-pt-sm">
            <div class="row">
              <div class="col-12 q-pl-sm">
                <div class="row">
                <div class="col-12 heading-2">
                  Scan to {{ title }}
                </div>
                <div class="col-12 sub-heading-2 q-my-sm">
                  This will open in your preferred SSB app, where you'll set up your alias like sarah@{{ activeRoom?.name }}
                </div>
                <a class="accent-text q-my-sm" href="https://scuttlebutt.nz">
                  What's an SSB app?
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-item :class="sectionClass" class="q-pa-sm">
        <q-item-section avatar>
          <a class="accent" @click.prevent="copy">
            {{ copied ? 'COPIED' : 'COPY URL' }}
            <q-icon v-if="copied" size="12px" name="done" />
          </a>
        </q-item-section>
        <q-item-section>
          <q-item-label class="sub-heading-2 scrollContainer" lines="1">{{ uri }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="q-ma-sm q-pa-sm">
        <q-item-label class="heading-2">
          Not on SSB yet? Download an app!
        </q-item-label>
      </q-item>
        <!-- TODO:  copy URL-->

      <div :class="sectionClass">
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


      <div :class="sectionClass">
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
    </div>
  </ModalContainer>
</template>

<script>

import { mapState } from 'pinia'
import { useRoomStore } from '@/stores/room'

import ModalContainer from '@/components/modal/ModalContainer.vue'
import QRCode from '@/components/QRCode.vue'

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
    uri: String,
    image: String
  },
  components: {
    ModalContainer,
    PlanetaryIcon,
    ManyverseIcon,
    AppStoreBtn,
    GooglePlayBtn,
    QRCode
    
  },
  data () {
    return {
      copied: false
    }
  },
  computed: {
    ...mapState(useRoomStore, ['activeRoom']),
    mobile () {
      return this.$q.screen.xs || this.$q.screen.sm
    },
    sectionClass () {
      return {
        'section-background': true,
        'q-pa-none-sm': true,
        'q-ma-none-sm': true,
        'q-ma-md': !this.mobile,
        'q-pa-md': !this.mobile,
        'q-ma-xs': this.mobile,
        'q-pa-xs': this.mobile,
        'q-mt-lg': true
      }
    }
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
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 100%;
  /* identical to box height, or 30px */

  color: #FFFFFF;
}

.heading-2 {
  font-family: 'SF Pro Text';
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
  font-family: 'SF Pro Text';
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
  font-family: 'SF Pro Text';
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
  font-family: 'SF Pro Text';
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

  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 9px;
  line-height: 120%;
  /* identical to box height, or 11px */

  /* Primary--dark */
  color: #FFFFFF;
}

.accent2 {
  /* background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 7px;
  text-decoration: none; */
  padding: 10px;
  cursor: pointer;
  text-decoration: none;


  /* Accent */
  background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  /* Bio */

  font-family: 'SF Pro Text';
  /* font-style: normal; */
  font-weight: 600;
  /* font-size: 20px; */
  /* line-height: 120%; */
  color: #FFFFFF;
  display: block;
  margin: auto;
}

.accent-text {
  /* Bio */
  font-family: 'SF Pro Text';
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

.scrollContainer::-webkit-scrollbar {
  display: none;
  
  /* overflow-x: auto; */
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollContainer {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  /* overflow: scroll; */
  overflow-x: auto;
  text-overflow: clip;
}

</style>