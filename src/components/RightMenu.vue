<template>
  <div class="right-container">
    <p v-for="model in models"
       v-if="!model.isActive && model.isRight"
       :key="model.id"
       @click="returnLeft(model)">
      {{ model.name }}
    </p>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

interface IChildren {
    name: string,
    index: number,
    isActive: boolean,
    isRight: boolean,
    latitude: string,
    longitude: string
}

@Component

export default class rightContainer extends Vue {
  model!: IChildren

  @Prop({
    type: Array
  })
  models!: Array<IChildren>

  returnLeft (model: IChildren) {
    model.isActive = false
    model.isRight = false
    this.$store.dispatch('returnMarker', model)
  }
}
</script>

<style scoped lang="scss">
  p {
    cursor: pointer;
  }
</style>
