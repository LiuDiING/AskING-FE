<template>
  <div>
    <div class="Chart">
      <h1 style="text-align:center;">Barchart</h1>
      <bar-example :data = barChartData></bar-example>
    </div>
  </div>
</template>

<script>
  import TreeView from '../TreeView/TreeView'
  import BarExample from '../../js/BarGraph'

  import shortName from '../../js/shortName'

  export default {
    components: {
      TreeView,
        BarExample
    },
    data () {
      return {
          barChartData:{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              datasets: [
                  {
                      label: 'GitHub Commits',
                      backgroundColor: '#f87979',
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                  }
              ]
          },
      }
    },
    methods: {
      }
  }
</script>

<style scoped>

</style>
