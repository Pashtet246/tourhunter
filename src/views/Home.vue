<template>
  <div class="home">
    <LeftMenu :models="markers"/>
    <Map :zoom="zoom"
         :center="center"
         :markers="markers"/>
    <RightMenu :models="rightList"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LeftMenu from '@/components/LeftMenu.vue'
import Map from '@/components/Map.vue'
import RightMenu from '@/components/RightMenu.vue'

@Component({
  components: {
    LeftMenu,
    Map,
    RightMenu
  }
})
export default class Home extends Vue {
  get rightList () {
    return this.$store.state.rightList
  }

  get zoom () {
    return this.$store.state.zoom
  }

  get center () {
    return this.$store.state.center
  }

  get markers () {
    return this.$store.state.markers
  }

  get countChange () {
    return this.$store.state.countChange
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  width: 100%;
}

.mapContainer {
  height: 800px;
  width: 70%;
}

.left-container,
.right-container {
  width: 15%;
}
</style>
