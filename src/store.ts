import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    center: [51.505, -0.09],
    zoom: 10,
    countChange: 0,
    rightList: [],
    markers: [
      {
        name: 'Toy magazines',
        children: [
          { name: 'Belame',
            children: [
              {
                id: 0,
                name: 'child folder',
                isActive: false,
                isRight: false,
                latitude: '-0.192',
                longitude: '51.51'
              },
              {
                id: 1,
                name: 'child folder 2',
                isActive: false,
                isRight: false,
                latitude: '-0.035',
                longitude: '51.47'
              }
            ]
          },
          { name: 'Toys',
            children: [
              {
                id: 2,
                name: 'child folder',
                isActive: false,
                isRight: false,
                latitude: '-0.036',
                longitude: '51.46'
              }
            ]
          },
          {
            name: 'Every toys',
            children: [
              {
                id: 3,
                name: 'child folder',
                isActive: false,
                isRight: false,
                latitude: '-0.022',
                longitude: '51.54'
              }
            ]
          }
        ]
      },
      {
        name: 'Parks',
        children: [
          { name: 'First park',
            children: [
              {
                id: 4,
                name: 'child park',
                isActive: false,
                isRight: false,
                latitude: '-0.445',
                longitude: '51.43'
              }
            ]
          },
          { name: 'Second park',
            children: [
              {
                id: 5,
                name: 'child park',
                isActive: false,
                isRight: false,
                latitude: '-0.271',
                longitude: '51.34'
              }
            ]
          },
          {
            name: 'Third park',
            children: [
              {
                id: 6,
                name: 'child park',
                isActive: false,
                isRight: false,
                latitude: '-0.1',
                longitude: '51.57'
              }
            ]
          }
        ]
      }
    ]
  },
  mutations: {
    ACTIVATE_MARKER: (state, payload) => {
      state.markers[payload.marker.isActive] = payload.marker.isActive
    },
    MOVE_MARKER_TO_RIGHT: (state, payload) => {
      state.markers[payload.marker.isActive] = payload.marker.isActive
      state.markers[payload.marker.isRight] = payload.marker.isRight
      state.rightList = state.rightList.concat(payload.marker)
    },
    RETURN_MARKER: (state, payload) => {
      state.rightList.slice(payload.marker.id, 1)
      state.markers[payload.marker.isActive] = payload.marker.isActive
      state.markers[payload.marker.isRight] = payload.marker.isRight
    }
  },
  actions: {
    activateMarker ({ commit }, data) {
      commit('ACTIVATE_MARKER', { marker: data })
    },
    moveMarker ({ commit }, data) {
      commit('MOVE_MARKER_TO_RIGHT', { marker: data })
    },
    returnMarker ({ commit }, data) {
      commit('RETURN_MARKER', { marker: data })
    }
  }
})
