<template>
  <div>
    <el-tabs v-model="activeTabName" @tab-click="changeTab">
      <el-tab-pane label="病历首页" name="medicalRecord">
        <medicalRecordAdder :registeredID="registeredID">

        </medicalRecordAdder>
      </el-tab-pane>
      <el-tab-pane label="检查申请" name="inspectApplication"></el-tab-pane>
      <el-tab-pane label="检验申请" name="checkOutApplication"></el-tab-pane>
      <el-tab-pane label="门诊确诊" name="definitediagnosis"></el-tab-pane>
      <el-tab-pane label="处置申请" name="department"></el-tab-pane>
      <el-tab-pane label="开具处方" name="createPrescription">
        <prescriptionAdder :registeredID="registeredID" :prescriptionTemplateDetails="prescriptionTemplateDetails">

        </prescriptionAdder>
      </el-tab-pane>
      <el-tab-pane label="费用查询" name="checkFee"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import medicalRecordAdder from '../medicalRecordManipulate/medicalRecordAdder.vue'
import prescriptionAdder from '../doctorPrescribing/prescriptionAdder.vue'

export default {
    name: 'MedicalRecordDiagnosePane',
    props: {
        dialogFormVisible: Boolean,
        registeredID: String,
        prescriptionTemplateDetails: Array,
        title: String
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
        prescriptionTemplateDetails: {
            handler (newValue, oldValue) {
                this.activeTabName = 'createPrescription'
            },
            deep: true
        }
    },
    methods: {
        changeTab (tab, event) {
            // console.log(tab, event);
            if (this.activeTabName === 'medicalRecord') {
            } else {
            }
        }
    },
    mounted () {},
    components: {
        medicalRecordAdder,
        prescriptionAdder
    }
}
</script>
<style lang="scss">
</style>
