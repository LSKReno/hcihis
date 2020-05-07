<template>
  <div class="chart-container">
    <doctorWorkloadStatisticsChart height="80%" width="100%" />
  </div>
</template>

<script>
import doctorWorkloadStatisticsChart from './components/doctorWorkloadStatisticsChart'

export default {
  name: 'DoctorWorkloadStatistics',
  components: { doctorWorkloadStatisticsChart }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
