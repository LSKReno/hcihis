<template>
  <div>
    <el-tabs v-model="activeTabName" @tab-click="changeTab">
      <el-tab-pane label="处方模板" name="prescriptionTemplate">
        <!-- <prescriptionTemplate>

                </prescriptionTemplate> -->

      </el-tab-pane>
      <el-tab-pane label="常用药品" name="commonDrugs"></el-tab-pane>
      <el-tab-pane label="建议方案" name="proposal"></el-tab-pane>
      <el-tab-pane label="历史处方" name="historyPrescription"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import prescriptionTemplateAdder from "../doctorPrescribing/prescriptionAdder.vue";
import prescriptionTemplate from '../prescriptionTemplate/PrescriptionTemplate.vue'

export default {
    name: 'MedicalRecordDiagnosePane',
    props: {
        dialogFormVisible: Boolean,
        registeredID: String,
        title: String
        // departTree: Array
    },
    data () {
        return {
            currentPatient: null,
            activeTabName: 'medicalRecord',
            form: {
                id: null,
                registeredID: '',
                patientTabPaneName: ''
            },
            tableDataWaitedPatient: [],
            tableDataVisitedPatient: [],
            btnLoading: false
        }
    },
    watch: {
        data: {}
    },
    methods: {
        changeTab (tab, event) {
            // console.log(tab, event);
            if (this.activeTabName === 'doctor') {
            } else {
            }
        }
    },
    mounted () {},
    components: {
        prescriptionTemplate
    }
}
</script>
<style lang="scss">
</style>
