<template>
  <div class="medicalRecord-dialog animated fadeInRight">
    <div style="text-align:center;position:fixed;z-index:-1">
      <img src="https://i.loli.net/2019/09/06/NS7rMvRkToB3JLn.png" style="width:75%;opacity:0.6" />
    </div>
    <el-form :inline="true" :model="form" style="opacity:0.99">
      <el-form-item label="挂号ID*">
        <el-input
          v-model="form.registeredID"
          placeholder="此处填写挂号ID"
          size="small"
          style="width:250px"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="自述">
        <el-input
          type="textarea"
          style="width:260px"
          v-model="form.selfDescription"
          placeholder="此处填写自述"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="现病史">
        <el-input
          type="textarea"
          style="width:200px"
          v-model="form.currentMedicalHistory"
          placeholder="此处填写现病史"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="目前治疗情况">
        <el-input
          type="textarea"
          style="width:260px"
          v-model="form.currentTreatmentSituation"
          placeholder="此处填写目前治疗情况*"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="既往病史">
        <el-input
          type="textarea"
          style="width:230px"
          v-model="form.pastMedicalHistory"
          placeholder="此处填写既往病史*"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="过敏史">
        <el-input
          type="textarea"
          style="width:260px"
          v-model="form.allergyHistory "
          placeholder="此处填写过敏史"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="体格检查">
        <el-input
          type="textarea"
          style="width:230px"
          v-model="form.physicalExamination "
          placeholder="此处填写体格检查"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="初诊">
        <el-input
          type="textarea"
          style="width:273px"
          v-model="form.initialDiagnosis "
          placeholder="此处填写初诊"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="诊断结果">
        <el-input
          type="textarea"
          style="width:230px"
          v-model="form.diagnosisResult"
          placeholder="此处填写诊断结果"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="检查建议">
        <el-input
          type="textarea"
          style="width:245px"
          v-model="form.inspectionSuggestion"
          placeholder="此处填写检查建议"
          size="small"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin:20px 0">
      <el-button round @click="reset">重 置</el-button>
      <el-button round type="primary" :loading="btnLoading" @click="btnOk">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { updateMedicalRecord as updateMedicalRecordApi } from '../../../api/medicalRecord'

export default {
    name: 'MedicalRecordAdder',
    props: {
        dialogFormVisible: Boolean,
        registeredID: String,
        title: String
    },
    data () {
        return {
            form: {
                id: null,
                registeredID: '',
                selfDescription: '',
                currentMedicalHistory: '',
                currentTreatmentSituation: '',
                pastMedicalHistory: '',
                allergyHistory: '',
                physicalExamination: '',
                initialDiagnosis: '',
                diagnosisResult: '',
                inspectionSuggestion: '',
                precautions: ''
            },
            departmentsList: [],
            btnLoading: false
        }
    },
    watch: {
        registeredID: {
            handler (newValue, oldValue) {
                this.form.registeredID = newValue
            },
            deep: true
        }
    },
    methods: {
        reset () {
            this.form = {
                id: null,
                registeredID: '',
                selfDescription: '',
                currentMedicalHistory: '',
                currentTreatmentSituation: '',
                pastMedicalHistory: '',
                allergyHistory: '',
                physicalExamination: '',
                initialDiagnosis: '',
                diagnosisResult: '',
                inspectionSuggestion: '',
                precautions: ''
            }
        },
        btnOk () {
            if (this.form.registeredID === '') {
                this.$message('挂号ID不可以为空喔~~')
            } else {
                if (this.form.selfDescription === '') {
                    // this.$message("自述不可以为空喔~~");
                    this.form.selfDescription = '暂无'
                }
                if (this.form.currentMedicalHistory === '') {
                    // this.$message("现病史不可以为空喔~~");
                    this.form.currentMedicalHistory = '暂无'
                }
                if (this.form.pastMedicalHistory === '') {
                    // this.$message("既往病史不可以为空喔~~");
                    this.form.pastMedicalHistory = '暂无'
                }
                if (this.form.allergyHistory === '') {
                    // this.$message("过敏史不可以为空喔~~");
                    this.form.allergyHistory = '暂无'
                }
                if (this.form.physicalExamination === '') {
                    // this.$message("体格检查不可以为空喔~~");
                    this.form.physicalExamination = '暂无'
                }
                if (this.form.initialDiagnosis === '') {
                    // this.$message("初诊不可以为空喔~~");
                    this.form.initialDiagnosis = '暂无'
                }
                if (this.form.inspectionSuggestion === '') {
                    // this.$message("检查建议不可以为空喔~~");
                    this.form.inspectionSuggestion = '暂无'
                }
                if (this.form.diagnosisResult === '') {
                    // this.$message("诊断结果不可以为空喔~~");
                    this.form.diagnosisResult = '暂无'
                }
                if (this.form.currentTreatmentSituation === '') {
                    // this.$message("目前治疗情况*不可以为空喔~~");
                    this.form.currentTreatmentSituation = '暂无'
                }
                this.btnLoading = true
                updateMedicalRecordApi({
                    registeredID: this.form.registeredID,
                    selfDescription: this.form.selfDescription,
                    currentMedicalHistory: this.form.currentMedicalHistory,
                    currentTreatmentSituation: this.form
                        .currentTreatmentSituation,
                    pastMedicalHistory: this.form.pastMedicalHistory,
                    allergyHistory: this.form.allergyHistory,
                    physicalExamination: this.form.physicalExamination,
                    initialDiagnosis: this.form.initialDiagnosis,
                    diagnosisResult: this.form.diagnosisResult,
                    inspectionSuggestion: this.form.inspectionSuggestion,
                    precautions: this.form.precautions
                })
                    .then(res => {
                        console.log(res)

                        if (res[0].status === 200) {
                            console.log('添加病历成功')
                            this.$message('您填写的病历添加成功了喔~~')
                            this.$emit('refreshMedicalRecords')
                        } else if (res[0].status === 1) {
                            this.$message('您填写的挂号ID不存在喔~~')
                            this.$emit('refreshMedicalRecords')
                        } else if (res[0].status === 2) {
                            this.$message('您填写的挂号ID已经退号了喔~~')
                            this.$emit('refreshMedicalRecords')
                        } else if (res[0].status === 3) {
                            // this.$message("您的填写出现空值报错了喔~~");
                            this.$emit('refreshMedicalRecords')
                        }
                    })
                    .catch(res => {
                        // console.log("没有拿到半句");
                        // this.$message("~~~有地方出问题啦");
                        this.$emit('refreshMedicalRecords')
                    })
            }
            this.btnLoading = false
            this.form = {
                id: null,
                registeredID: '',
                selfDescription: '',
                currentMedicalHistory: '',
                currentTreatmentSituation: '',
                pastMedicalHistory: '',
                allergyHistory: '',
                physicalExamination: '',
                initialDiagnosis: '',
                diagnosisResult: '',
                inspectionSuggestion: '',
                precautions: ''
            }
            this.$emit('refreshMedicalRecords')
        }
    },
    components: {}
}
</script>
<style lang="scss">
.medicalRecord-dialog {
    width: 632px;
}
</style>
