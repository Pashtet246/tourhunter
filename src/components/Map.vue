<template>
  <div class="mapContainer">
    <div id="map"></div>
  </div>
</template>

<script lang="ts">
import L from 'leaflet'
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'

interface IModel {
    name: string,
    children: Array<IChildren>
}

interface IChildren {
    name: string,
    children: Array<ILast>
}

interface ILast {
  name: string,
  index: number,
  isActive: boolean,
  isRight: boolean,
  latitude: string,
  longitude: string
}

@Component

export default class mapContainer extends Vue {
  map!: L.Map
  activeMarkers: Array<L.Layer> = []
  allMarkers: Array<ILast> = []

  @Prop({
    type: Number,
    default: 13
  })
  zoom!: number

  @Prop({
    type: Array,
    required: true
  })
  center!: L.LatLng

  @Prop({
    type: Array
  })
  markers!: Array<IModel>

  @Watch('markers', { deep: true })
  onMarkersChanged (val: Array<ILast>, oldVal: Array<ILast>) {
    this.makeMarkers()
  }

  mounted () {
    this.makeMap()
    this.makeMarkers()
  }

  makeMap () {
    this.map = L.map('map').setView(this.center, this.zoom)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    let blueIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.3.3/dist/images/marker-icon.png',
      iconSize: [30, 50],
      iconAnchor: [20, 30],
      popupAnchor: [1, -31]
    })
    this.markers.forEach(marker => {
      if (marker.hasOwnProperty('children')) {
        for (let index in marker.children) {
          if (marker.children[index].hasOwnProperty('children')) {
            let currentModel = marker.children[index]
            for (let index in currentModel.children) {
              this.allMarkers.push(currentModel.children[index])
              let Marker = L.marker(
                [Number(currentModel.children[index].longitude), Number(currentModel.children[index].latitude)],
                { icon: blueIcon }
              )
                .on('mouseover', () => {
                  currentModel.children[index].isActive = false
                  currentModel.children[index].isRight = true
                  this.$store.dispatch('moveMarker', currentModel.children[index])
                })
              this.activeMarkers.push(Marker)
            }
          }
        }
      }
    })
  }

  makeMarkers () {
    this.allMarkers.map((marker, index) => {
      if (marker.isActive) {
        this.map.addLayer(this.activeMarkers[index])
      } else {
        this.map.removeLayer(this.activeMarkers[index])
      }
    })
  }
}

</script>

<style scoped lang="scss">
@import "~leaflet/dist/leaflet.css";
#map {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
