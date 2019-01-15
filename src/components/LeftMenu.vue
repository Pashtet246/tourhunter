<template>
  <div class="left-container">
    <ul id="leftList" class="left-menu">
      <List
        class="item"
        v-for="(model) in models"
        :key="model.index"
        :model="model"/>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import List from '@/components/List.vue'

interface IModel {
    name: string,
    children: Array<IChildren>,
}

interface IChildren {
    name: string,
    children: Object,
    index: number,
    isActive: boolean,
    latitude: string,
    longitude: string
}

@Component({
  components: {
    List
  }
})

export default class leftContainer extends Vue {
  @Prop({
    type: Array
  })
  models!: Array<IModel>
}
</script>

<style lang="scss" scoped>
  .item {
    cursor: pointer;
  }
</style>
