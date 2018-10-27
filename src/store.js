import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weather: null,
    tide: null,
    locationName: null,
    sun: null,
    high: null,
    low: null
  },
  getters: {
    getWeather: (state) => () => {
      return state.weather
    },
    getTide: (state) => () => {
      return state.tide
    },
    getLocationName: (state) => () => {
      return state.locationName
    },
    getSun: (state) => () => {
      return state.sun
    },
    getHigh: (state) => () => {
      return state.high
    },
    getLow: (state) => () => {
      return state.low
    }
  },
  mutations: {
    setWeather (state, data) {
      state.weather = data
      state.locationName = data.weatherdata.location[0].name[0]
      state.sun = data.weatherdata.sun[0].$
    },
    setTide (state, data) {
      let array = []
      data.forEach((el) => {
        array.push({'time': el.$.time, 'value': el.$.value})
      })
      state.tide = array
      let high = {
        time: '',
        value: '0'
      }
      let low = {
        time: '',
        value: '0'
      }
      array.forEach((el) => {
        if (parseInt(el.value) > parseInt(high.value)) {
          high = el
        } else if (parseInt(el.value) < parseInt(high.value)) {
          low = el
        }
      })
      state.high = high
      state.low = low
    },
  },
  actions: {

  }
})
