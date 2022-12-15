<template>
  <q-card class="comment-card" light>
    <q-item class="card-header">
      <q-item-section avatar>
        <q-skeleton type="QAvatar" animation="fade" width="38px" height="38px"/>
      </q-item-section>

      <q-item-section no-wrap>
        <q-item-label class="card-header-text">
          <q-skeleton type="text" animation="fade" width="50%"/>
        </q-item-label>
        <q-item-label class="light-text" style="left: -10px;" caption>
          <q-skeleton type="text" animation="fade" width="20%" />
        </q-item-label>
      </q-item-section>

    </q-item>

    <q-separator class="top-divider" />

    <q-card-section class="q-ma-md">
      <q-skeleton type="text" class="text-subtitle2" animation="fade" />
      <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
      <q-skeleton height="200px" square animation="fade" />
      <q-skeleton type="text" class="text-subtitle2" animation="fade" />
      <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
    </q-card-section>


    <q-separator class="bottom-divider"/>

    <q-card-section style="padding-left: 25px;">
      <q-skeleton type="QAvatar" animation="fade" width="20px" height="20px" />
    </q-card-section>
  
    <q-card-section class="q-pt-md">
      <span class="card-header-text row" style="padding-left: 20px;">
        <q-skeleton type="QAvatar" animation="fade" width="20px" height="20px" />
        <q-skeleton type="QAvatar" animation="fade" width="20px" height="20px" />
        <q-skeleton class="q-ml-md" type="text" width="100px" animation="fade" />
      </span>
    </q-card-section>
  </q-card>
</template>



<script>
import Markdown from './Markdown.vue'
import Reactions from './Reactions.vue'
import AvatarGroup from './avatar/AvatarGroup.vue'


export default {
  name: "CommentSkeleton",
  components: {
    Markdown,
    Reactions,
    AvatarGroup
  },
  props: {
  },
  computed: {
      mobile () {
        return this.$q?.screen.xs || this.$q?.screen.sm
      }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/quasar.variables.scss';

  .light-text {
    font-family: 'SF Pro Text';
    color: $lightText;
  }

  .text {
    /* Post text */
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    /* or 143% */
    letter-spacing: -0.1px;

    color: $pText;
  }

  .card-header {
    height: 70px;

    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.07) 100%);
    background-blend-mode: overlay;
    background: #3D2961;
  }

  .card-header-text {
    // height: 16px;
    left: -10px;

    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.15533140301704407px;
    text-align: left;

    color: #FFFFFF;
  }

  .comment-card {
    box-shadow:
      0px 6.21326px 0px #2C1D45,
      0px 6.21326px 15.5331px rgba(0, 0, 0, 0.25);

    -webkit-box-shadow:
      0px 6.21326px 0px #2C1D45,
      0px 6.21326px 15.5331px rgba(0, 0, 0, 0.25);


    background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.07) 100%);
    background-blend-mode: overlay;
    border-radius: 31.0663px;

    background: #3D2961;
  }

  // background styling in parent component
  .flat-comment-card {
    background: none;
  }

  .comment-action {
    color: #8575A3;
  }



  .top-divider {
    height: 0px;
    opacity: 0.3;

    border: 0.97px solid #271A3D;
    background-color: #271A3D;
    box-shadow: 0px 1.55331px 0px #4A3275;
    -webkit-box-shadow: 0px 1.55331px 0px #4A3275;
    // color: white;
  }

  .bottom-divider {
    height: 0px;
    opacity: 0.3;

    border: 0.97px solid #271A3D;
    background-color: #271A3D;
    box-shadow: 0px 1.55331px 0px #4A3275;
    -webkit-box-shadow: 0px 1.55331px 0px #4A3275;
  }

  .avatar {
    width: 37.28px;
    height: 37.28px;
  }

  .hidden-text {
    font-size: 20px;
    font-weight: 400;
    line-height: 31px;
    letter-spacing: 0px;
    font-family: 'SF Pro Text';
  }
</style>