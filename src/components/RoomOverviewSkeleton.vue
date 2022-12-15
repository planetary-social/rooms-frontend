<template>
  <q-card :style="cardStyle" dark flat class="card">
    <q-item>
      <q-item-section avatar>
        <q-skeleton type="QAvatar" animation="fade" width="120px" height="120px" class="skeleton"/>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" animation="fade" width="60%" height="80px" class="skeleton"/>
        </q-item-label>
      </q-item-section>
    </q-item>
    <div class="scrollContainer" :style="scrollStyle">
      <q-item>
        <q-item-section>
          <q-skeleton type="text" width="50%" height="50px" animation="fade" class="skeleton" />
          <q-skeleton type="text" width="60%"  height="50px" animation="fade" class="skeleton" />
        </q-item-section>
      </q-item>
      <q-item class="subheader">
        Room Stats
      </q-item>
      <div class="row justify-start q-pb-lg">
        <div class="q-pl-lg">
          <q-item-section class="q-ml-sm">
            <q-item class="content-start q-py-none">
              <q-skeleton type="QChip" animation="fade" width="60px" height="35px" class="skeleton" />
            </q-item>
            <q-item class="content-start q-py-none" style="margin-top: -30px; margin-left: 10px;">
              <q-skeleton type="text" width="40px" height="100px" animation="fade" class="skeleton" />
            </q-item>
            <q-item-label class="stats" caption style="margin-top: -20px;">
              members
            </q-item-label>
          </q-item-section>
        </div>
      </div>
      <q-item class="subheader">
        Newest Public Members
      </q-item>
      <q-item class="content-start">
        <q-skeleton type="QAvatar" animation="fade" width="60px" height="60px" class="q-mr-md skeleton"/>
        <q-skeleton type="QAvatar" animation="fade" width="60px" height="60px" class="q-mr-md skeleton"/>
        <q-skeleton type="QAvatar" animation="fade" width="60px" height="60px" class="q-mr-md skeleton"/>
        <q-skeleton type="QAvatar" animation="fade" width="60px" height="60px" class="q-mr-md skeleton"/>
        <q-skeleton type="QAvatar" animation="fade" width="60px" height="60px" class="q-mr-md skeleton"/>
      </q-item>
    </div>
  </q-card>
</template>



<script>
  export default {
    name: "OverviewSkeleton",
    computed: {
      mobile () {
        return this.$q.screen.xs || this.$q.screen.sm
      },
      cardStyle () {
        return {
          width: this.mobile
            ? `${this.$q?.screen.width-25}px`
            : '535.89px'
        }
      },
      scrollStyle () {
        return {
          height: this.mobile ? 'auto' : '70vh',
          overflow: 'auto'
        }
      }
    }
  }
</script>

<style scoped>

  .skeleton {
    background: #2B1D44;
  }
  .card {
    background: none;
  }

  .scrollContainer::-webkit-scrollbar {
    display: none;
  }

  .scrollContainer {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .stats {
    font-family: 'SF Pro Text';
    font-size: 18px;
    font-weight: 400;
    line-height: 29px;
    letter-spacing: -0.14864864945411682px;
    text-align: center;
    color: #8575A3;
  }

  .subheader {
    /* Following */

    height: 24px;

    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 120%;
    /* identical to box height, or 24px */
    letter-spacing: -0.174603px;

    color: #FFFFFF;
  }

</style>