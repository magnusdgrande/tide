<template>
  <div class="search">
    <h1 class="title">SØK</h1>
    <el-input class="search-input" placeholder="" v-model="input"></el-input>
    <div class="date-container">
      <el-date-picker
        v-model="from"
        class="date-picker"
        type="date"
        placeholder="Fra">
      </el-date-picker>
      <el-date-picker
        v-model="to"
        class="date-picker"
        type="date"
        placeholder="Til">
      </el-date-picker>
    </div>
    <el-button class="submit-button" @click="find">Søk</el-button>
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
      tide: null,
      from: null,
      to: null
    }
  },
  methods: {
    find () {
      let from = this.$moment(this.from).format('YYYY-MM-DD')
      let to = this.$moment(this.to).format('YYYY-MM-DD')
      this.$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=Geiranger,+CA&key=AIzaSyDpURb79tdvjDP5GEdlhBKJFXD6a3qWMRc').then((res) => {
        this.lat = res.data.results[0].geometry.location.lat
        this.lon = res.data.results[0].geometry.location.lng
        this.$http.get('https://api.sehavniva.no/tideapi.php?lat=' + this.lat + '&lon=' + this.lon + '&fromtime=' + from + 'T00%3A00&totime=' + to + 'T00%3A00&datatype=all&refcode=cd&place=&file=&lang=nn&interval=60&dst=0&tzone=&tide_request=locationdata').then((res) => {
          parseString(res.data, {trim: true}, (err, result) => {
            result.tide.locationdata[0].data.forEach((el) => {
              if (el.$.type === 'forecast') {
                this.$store.commit('setTide', el.waterlevel)
              }
            })
          })
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: column;
  background-color: #e5ecf4;
  height: 100%;
  .title {
    margin-top: 20vh;
    color: #2f3543;
    font-size: 36px;
  }
  .search-input {
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    flex: 1;
  }
  .submit-button {
    max-width: 150px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    flex: 1;
    max-height: 50px;
    margin-bottom: 200px;
  }
  .date-container {
    flex: 1;
    display: flex;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
    .date-picker {
      display: block;
      width: 50%;
      flex: 1;
      margin: 0 5px 0 5px;
    }
  }
}
</style>
