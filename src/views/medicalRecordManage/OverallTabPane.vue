<template>
  <div style="margin-left: 20px; margin-top: 5px;">
    <el-tabs v-model="activePageName" @tab-click="changePageTab">
      <el-tab-pane label="编辑病历" name="editMedRecord">
        <editMedRecord :currentPatient="patient"></editMedRecord>
      </el-tab-pane>
      <el-tab-pane label="检查检验项目" name="medicalProject">
        <medicalProject></medicalProject>
      </el-tab-pane>
      <el-tab-pane label="处方" name="prescription">
        <prescription></prescription>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import editMedRecord from './editMedicalRecored/editMedRecord'
import medicalProject from './medicalProject/medicalProject'
import prescription from './prescription/prescription'
export default {
  name: 'OverallTabPane',
  data () {
    return {
      currentPatient: null
    }
  },
  methods: {
    changePageTab () {}
  },
  components: {
    editMedRecord,
    medicalProject,
    prescription
  },
  props: {
    patient: Object
  }
}
</script>

<style>
</style>
