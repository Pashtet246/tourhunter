<template>
  <li>
    <div
      :class="{bold: isFolder, red: isChosen}"
      @click="activateMarker">
      {{ model.name }}
      <span v-if="isFolder"
            @click="toggle">
            [{{ open ? '-' : '+' }}]
      </span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <List
        v-for="(model, index) in model.children"
        v-if="!model.isActive && !model.isRight"
        :key="index"
        :model="model"/>
    </ul>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

interface IModel {
    name: string,
    id: number,
    isActive: boolean,
    isRight: boolean,
    children: Array<IChildren>
}

interface IChildren {
    name: string,
    children: Array<ILastChildren>,
    index: number,
    isActive: boolean,
    isRight: boolean,
    latitude: string,
    longitude: string
}

interface ILastChildren {
  name: string,
  index: number,
  isActive: boolean,
  isRight: boolean,
  isShowRight: boolean,
  latitude: string,
  longitude: string
}

@Component

export default class List extends Vue {
  open: boolean = true

  @Prop({
    type: Object
  })
  model!: IModel

  get isFolder () {
    return this.model.children && this.model.children.length >= 1
  }

  get isChosen () {
    if (this.model.hasOwnProperty('children')) {
      for (let index in this.model.children) {
        if (this.model.children[index].hasOwnProperty('children')) {
          let currentModel = this.model.children[index]
          for (let index in currentModel.children) {
            if (currentModel.children[index].isRight === true || currentModel.children[index].isActive === true) {
              return true
            }
          }
        } else {
          if (this.model.children[index].isRight === true || this.model.children[index].isActive === true) {
            return true
          }
        }
      }
    } else {
      return false
    }
    return false
  }

  toggle () {
    if (this.isFolder) {
      this.open = !this.open
    }
  }

  activateMarker () {
    if (this.model.hasOwnProperty('children')) {
      for (let index in this.model.children) {
        if (this.model.children[index].hasOwnProperty('children')) {
          let currentModel = this.model.children[index]
          for (let index in currentModel.children) {
            if (currentModel.children[index].isRight === false) {
              currentModel.children[index].isActive = true
              this.$store.dispatch('activateMarker', currentModel.children[index])
            }
          }
        } else {
          if (this.model.children[index].isRight === false) {
            this.model.children[index].isActive = true
            this.$store.dispatch('activateMarker', this.model.children[index])
          }
        }
      }
    } else {
      if (this.model.isRight === false) {
        this.model.isActive = true
        this.$store.dispatch('activateMarker', this.model)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .bold {
    font-weight: bold;
  }
  .red {
    color: red;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }
</style>
