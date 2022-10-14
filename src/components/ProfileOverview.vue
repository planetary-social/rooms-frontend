<template>
  <q-card :style="cardStyle" dark flat class="card">
    <q-item>
      <q-item-section avatar>
        <q-avatar size="120px">
          <q-img :src="profile?.image" placeholder="avatar" class="avatar" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="title">{{ profile?.name }}</q-item-label>
        <q-item-label class="subtext" style="color: #FFFAF9;" caption>
          <!-- TODO -->
          <span>{{ profile?.name }}</span>
          <span style="color: #8575A3;">@todo.planetary</span>
        </q-item-label>
        <q-item class="q-px-none">
          <!-- TODO: outlined icon -->
          <q-btn class="accent" icon="person_add" disabled rounded no-caps label="Follow" />
        </q-item>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label class="description-text">
          <Markdown :text="profile?.description"/>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      Last Active: N/A
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label class="stats-header" caption>
          {{ profile?.followersCount }}
        </q-item-label>
        <q-item-label class="stats" caption>
          followers
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label class="stats-header" caption>
          {{ profile?.followingCount }}
        </q-item-label>
        <q-item-label class="stats" caption>
          following
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label class="stats-header" caption>
          N/A
        </q-item-label>
        <q-item-label class="stats" caption>
          ignored by
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label class="stats-header" caption>
          N/A
        </q-item-label>
        <q-item-label class="stats" caption>
          rooms
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="column">
      <div class="col-12">
        Active On: TODO
      </div>
      <div>
        <q-btn class="q-mx-sm q-my-xs gradient-button" disabled v-for="i in 20" :key="i" flat>
          <span class="gradient-text">{{ `#testing${i}` }}</span>
        </q-btn>
      </div>
    </q-item>
  </q-card>
</template>



<script>
// import { mapState, mapActions } from 'pinia'
// import { useProfileStore } from '@/stores/profile'
import Markdown from '@/components/Markdown.vue'

  export default {
    name: "ProfileOverview",
    props: {
      profile: Object
    },
    components: {
      Markdown
    },
    computed: {
      cardStyle () {
        return {
          width: this.$q?.screen?.xs
            ? `${this.$q?.screen.width-25}px`
            : '535.89px'
        }
      }
    }
  }
</script>

<style scoped>
  .card {
    background: none;
    /* Cell--dark */
    /* background: linear-gradient(180deg, #3D2961 0%, #332251 60.72%); */
    /* box-shadow: 0px 4px 0px #2C1D45, 0px 4px 10px rgba(0, 0, 0, 0.25); */
    /* border-radius: 20px; */
  }

  .title {
    /* Name */

    /* font-family: 'SF Pro Text'; */
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 100%;
    /* identical to box height, or 30px */

    color: #FFFFFF;
  }

  .description-text {
    /* font-family: 'SF Pro Text'; */
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 120%;
    /* or 24px */
    letter-spacing: -0.174603px;

    color: #FFFFFF;
    word-wrap: break-word;
  }

  .subtext {
    /* font-family: SF Pro Text; */
    font-size: 20px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.1746031790971756px;
    text-align: left;
  }

  .stats-header {
    /* font-family: SF Pro Text; */
    font-size: 39px;
    font-weight: 400;
    line-height: 62px;
    letter-spacing: -0.14864864945411682px;
    text-align: center;
    color: #FFFFFF;
  }

  .stats {
    /* font-family: SF Pro Text; */
    font-size: 18px;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: -0.14864864945411682px;
    text-align: center;
    color: #8575A3;
  }

  .accent  {
    background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
    border: 2.97297px solid #231837;
    border-radius: 25.2484px;
  }

  .gradient-button {
    background: 
      linear-gradient(var(--color-background), var(--color-background)) padding-box,
      linear-gradient(to right, #F08508, #F43F75) border-box;
    border-radius: 147.16px;
    border: 1px solid transparent;
    /* opacity: 0.9; */
  }

  .gradient-text {
    background: linear-gradient(90deg, #F08508 0%, #F43F75 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .avatar {
    border-radius: 139.358px;
    background: 
      linear-gradient(var(--color-background), var(--color-background)) padding-box,
      linear-gradient(to right, #F08508, #F43F75) border-box;
    border: 5px solid transparent;
    width: 120px;
    height: 120px;
  }


</style>