<template>
  <div class="home">
    <search></search>
    <span class="location-name">{{locationName}}</span>
    <div class="low-high-container">
      <div class="high" v-if="high">
        <div>Høyvann: {{high.time | moment("HH:mm")}}</div>
        <div>{{high.value}} CM</div>
      </div>
      <div class="low" v-if="low">
        <div>Lavvann: {{low.time | moment("HH:mm")}}</div>
        <div>{{low.value}} CM</div>
      </div>
    </div>
    <line-example v-if="tide"></line-example>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue'
import LineExample from '@/components/LineChart.js'
export default {
  name: 'home',
  components: {
    Search,
    LineExample
  },
  computed: {
    weather () {
      return this.$store.getters.getWeather()
    },
    tide () {
      return this.$store.getters.getTide()
    },
    locationName () {
      return this.$store.getters.getLocationName()
    },
    high () {
      return this.$store.getters.getHigh()
    },
    low () {
      return this.$store.getters.getLow()
    }
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
    this.now = this.$moment()
  }
}
</script>
<style scoped lang="scss">
.home {
  .location-name {
    font-size: 38px;
  }
  .low-high-container {
    display: flex;
    margin-top: 20px;
    .low {
      flex: 1;
    }
    .high {
      flex: 1;
    }
  }
}
</style>