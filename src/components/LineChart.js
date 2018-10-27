import {Line} from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    let tide = this.$store.getters.getTide()
    let labels = []
    let data = []
    tide.forEach((el) => {
      labels.push(this.$moment(el.time).format("HH:mm"))
      data.push(parseInt(el.value))
    })
    this.renderChart({
      labels: labels,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#62b1ff',
          data: data
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})

  }
}