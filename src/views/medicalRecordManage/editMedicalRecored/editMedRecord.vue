<template>
  <div>
    <div
      style="width: 60%; height: 500px; float: left;
             border-style: solid; border-color: lightgray;
             border-top-width: 0px; border-right-width: 1px;
             border-bottom-width: 0px; border-left-width: 0px;"
    >
      <div style="height: 40px">
        <span style="float: left; width: 200px">
          <p style="font-size: 20px; margin-left: 100px">病历内容</p>
        </span>
        <span style="float: left; margin-top: 2px">
          <p
            style="font-size: 13px; padding-top: 5px"
            :class="this.currentPatient.currentRecord.status === '已提交' ? 'set_grey':''"
          >{{ this.currentPatient.currentRecord.status }}</p>
        </span>
        <span style="float: right; margin-right: 20px">
          <el-button-group>
            <el-button
              size="small"
              plain
              :disabled="this.haveSubmittedMedRecord"
              @click="saveMedRecord"
            >暂存</el-button>
            <el-button
              size="small"
              plain
              :disabled="this.haveSubmittedMedRecord"
              @click="setSubmittedMedRecord"
            >提交</el-button>
          </el-button-group>
        </span>
      </div>
      <div style="width: 90%; margin-top: 5px">
        <div></div>
        <el-form
          ref="form"
          :model="form"
          label-width="110px"
          label-position="right"
          :disabled="this.haveSubmittedMedRecord"
        >
          <el-form-item label="主述*">
            <el-input
              size="medium"
              type="textarea"
              v-model="currentPatient.currentRecord.selfDescription"
              @change="setUnsaveMedRecord"
            ></el-input>
          </el-form-item>
          <el-form-item label="现病史*">
            <el-input
              size="medium"
              type="textarea"
              v-model="currentPatient.currentRecord.currentMedicalHistory"
              @change="setUnsaveMedRecord"
            ></el-input>
          </el-form-item>
          <el-form-item label="现病治疗情况*">
            <el-input
              size="medium"
              type="textarea"
              v-model="currentPatient.currentRecord.currentTreatmentSituation"
              @change="setUnsaveMedRecord"
            ></el-input>
          </el-form-item>
          <el-form-item label="既往病史*">
            <el-input
              size="medium"
              type="textarea"
              v-model="currentPatient.currentRecord.pastMedicalHistory"
              @change="setUnsaveMedRecord"
            ></el-input>
          </el-form-item>
          <el-form-item label="过敏史*">
            <el-input
              size="medium"
              type="textarea"
              v-model="currentPatient.currentRecord.allergyHistory"
              @change="setUnsaveMedRecord"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div style="width: 40%; float: right">
      <diseaseDiagnose :currentPatient="currentPatient"></diseaseDiagnose>
    </div>
  </div>
</template>

<script>
import diseaseDiagnose from './diseaseDiagnose'
export default {
  name: 'EditMedRecord',
  data () {
    return {
      form: {
        selfDescription: '',
        currentMedicalHistory: '',
        currentTreatmentSituation: '',
        pastMedicalHistory: '',
        allergyHistory: ''
      }
    }
  },
  methods: {
    setUnsaveMedRecord () {
      console.log('change')
      this.currentPatient.currentRecord.status = '未保存'
    },
    saveMedRecord () {
      this.currentPatient.currentRecord.status = '已保存'
      this.currentPatient.patientMedRecord.append(this.currentRecord)
    },
    setSubmittedMedRecord () {
      if (this.currentPatient.currentRecord.selfDescription === ''){
        this.$message.error('主诉不能为空')
      }
      else if (this.currentPatient.currentRecord.currentMedicalHistory === '') {
        this.$message.error('现病史不能为空')
      }
      else if (this.currentPatient.currentRecord.currentTreatmentSituation === '') {
        this.$message.error('现病治疗情况不能为空')
      }
      else if (this.currentPatient.currentRecord.pastMedicalHistory === '') {
        this.$message.error('既往病史不能为空')
      }
      else if (this.currentPatient.currentRecord.allergyHistory === '') {
        this.$message.error('过敏史不能为空')
      } else {
        this.$message.success('已提交')
        this.currentPatient.currentRecord.status = '已提交'
        this.currentPatient.currentRecord.submitTime = new Date()
      }
    }
  },
  computed: {
    haveSubmittedMedRecord () {
      return this.currentPatient.currentRecord.status === '已提交'
    }
  },
  props: {
    currentPatient: Object
  },
  components: {
    diseaseDiagnose
  }
}
</script>

<style>
.set_grey {
  color: gray;
}
</style>
