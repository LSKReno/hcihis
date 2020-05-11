<template>
  <div style="margin: 10px 10px 10px 10px">
    <div style="background-color: white; width: 1250px; height: 600px">
      <PatientInfoPane style="width: 20%; height: 570px; float: left" @handleCurrentPatient="getCurrentPatient"> </PatientInfoPane>
      <OverallTabPane style="width: 70%; float: left" :patient="currentPatient"></OverallTabPane>
    </div>
  </div>
</template>

<script>
import PatientInfoPane from "./components/patientInfoPane"
import OverallTabPane from "./OverallTabPane"

export default {
  data () {
    return {
      currentPatient: null
    }
  },
  methods: {
    getCurrentPatient(patient) {
      this.currentPatient = patient
      console.log('Mainpage', this.currentPatient)
    }
  },

  created () {

  },

  components: {
    OverallTabPane,
    PatientInfoPane,
  }
}
</script>
<style>
.patientTabPane {
  float: left;
  margin-right: 10px;
  margin-left: 4px;
}
.medicalRecordDiagnosePane {
  float: left;
}
.patientInfoBg {
  opacity: 0.6;
  text-align: center;
  position: absolute;
  width: 350px;
  height: 250px;
  background-image: url("https://i.loli.net/2019/09/16/ERxDuwiF17ATagy.png");
  background-size: 300px 220px;
  background-repeat: no-repeat;
  background-position: 20px 40px;
}
</style>
