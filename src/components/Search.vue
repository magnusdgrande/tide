<template>
  <div class="search">
    <input class="search-input" v-model="input">
    <button class="submit-button" @click="test"></button>
  </div>
</template>

<script>
var parseString = require('xml2js').parseString
export default {
  name: 'search',
  data () {
    return {
      input: '',
      sun: null,
      lat: 0,
      lon: 0,
      now: null,
      tide: null
    }
  },
  methods: {
    test () {
      let from = this.now.format('YYYY-MM-DD')
      let to = this.now.add(1, 'days').format('YYYY-MM-DD')
      this.$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=Geiranger,+CA&key=AIzaSyDpURb79tdvjDP5GEdlhBKJFXD6a3qWMRc').then((res) => {
        this.lat = res.data.results[0].geometry.location.lat
        this.lon = res.data.results[0].geometry.location.lng
        this.$http.get('https://api.sehavniva.no/tideapi.php?lat=' + this.lat + '&lon=' + this.lon + '&fromtime=' + from + 'T00%3A00&totime=' + to + 'T00%3A00&datatype=all&refcode=cd&place=&file=&lang=nn&interval=60&dst=0&tzone=&tide_request=locationdata').then((res) => {
          parseString(res.data, (err, result) => {
            this.$store.commit('setTide', result.tide.locationdata[0].data[0].waterlevel)
          })
        })
      })
    }
  },
  mounted () {
    this.now = this.$moment()
  }
}
</script>
<style scoped lang="scss">
.search {
  margin-bottom: 15px;
  .search-input {
    width: 80%;
    float: left;
    height: 26px;
    border-radius: 5px;
  }
  .submit-button {
    width: 17%;
    height: 32px;
    border-radius: 5px;
  }
}
</style>
