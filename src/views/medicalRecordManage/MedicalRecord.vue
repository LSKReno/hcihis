<template>
  <div>
    <ToolBar style="border-radius:15px;margin-bottom:10px;">
      <div style="width:1300px">
        <el-card class="box-card patientTabPane" shadow="hover" body-style="padding:5px">
          <patientTabPane
            style="width:230px;border-radius:15px;"
            @getPatient="getPatientInfo"
          ></patientTabPane>
        </el-card>
        <el-card
          class="box-card medicalRecordDiagnosePane"
          shadow="hover"
          body-style="padding:0px;max-height:701px"
        >
          <medicalRecordDiagnosePane
            style="margin-right:5px;padding:0 5px;padding-left:10px;"
            :registeredID="patientRegisteredID"
            :prescriptionTemplateDetails="prescriptionTemplateDetails"
          ></medicalRecordDiagnosePane>
        </el-card>
        <div style="float:left;margin-left:10px;font-size:14px;">
          <el-card class="box-card" shadow="hover" body-style="width:350px;opacity:0.99;">
            <div class="patientInfoBg">
            </div>
            <div style="opacity:0.99;">
              <div slot="header" style="height:20px;">
                <span>患者信息</span>
                <el-button
                  style="float: right; padding: 10px;background-color:#99CCCC;opacity:0.99"
                  round
                  @click="diagnoise"
                >{{ currentPatient.visitingStatus==0 ? "看 诊":"开 处 方" }}</el-button>
                <el-button
                  style="float: right; padding: 10px;background-color:#FFCCCC;opacity:0.99"
                  round
                  @click="cancelInfoDisplay"
                >取 消</el-button>
              </div>
              <div>患者姓名: {{ currentPatient.realName=="" ? "请选择患者":currentPatient.realName }}</div>
              <div
                style="width:150px"
              >病历ID: {{ currentPatient.medicalRecordID=="" ? "请选择患者":currentPatient.medicalRecordID }}</div>
              <div
                style="width:150px"
              >挂号ID: {{ currentPatient.registeredID=="" ? "请选择患者":currentPatient.registeredID }}</div>
              <div>年龄: {{ currentPatient.age=="" ? "请选择患者":currentPatient.age }}</div>
              <div>性别: {{ currentPatient.gender=="" ? "请选择患者":currentPatient.gender }}</div>
              <div>
                挂号级别:
                <div
                  v-if="currentPatient.registeredLevel=='' "
                  style="float:right;"
                >
                  <el-tag
                    style="border-radius:20px"
                    type="info"
                    size="small"
                  >请选择患者</el-tag>
                </div>
                <div v-else>
                  <el-tag
                    v-if="currentPatient.registeredLevel=='zjh' "
                    style="border-radius:20px"
                    type="success"
                    size="small"
                  >专家号</el-tag>
                  <el-tag
                    v-else
                    style="border-radius:20px"
                    type="warning"
                    size="small"
                  >普通号</el-tag>
                </div>
              </div>
            </div>
          </el-card>
        </div>

        <div style="width:350px;float:right;margin-right:30px;margin-top:10px;opacity:0.99">
          <el-card class="box-card" shadow="hover" body-style="width:350px;padding:0px">
            <prescriptionTemplate
              @getPrescriptionTemplateDetails="getPrescriptionTemplateDetails"
            ></prescriptionTemplate>
          </el-card>
        </div>
      </div>
    </ToolBar>

    <div>
      <div style="float: left">
        <el-input
          placeholder="搜索病历号"
          size="small"
          style="width: 140px"
          v-model="searchParams.medicalRecordID"
          @change="searchRegistration"
          @clear="searchRegistration"
          clearable
        ></el-input>
        <el-button
          style="background-color: #99CC99"
          icon="el-icon-search"
          size="small"
          round
          @click="searchRegistration"
        ></el-button>
      </div>
      <div style="margin-top:10px;">
        <el-table
          :data="tableDataMedicalRecords"
          border
          ref="table"
          height="455px"
          style="width: 100%;border-radius:15px;margin-top:10px;"
        >
          <el-table-column prop="id" fixed label="id" width="70"></el-table-column>
          <el-table-column prop="medicalRecordID" label="病历ID" width="140"></el-table-column>
          <el-table-column prop="registeredID" label="挂号ID" width="140"></el-table-column>
          <el-table-column prop="patientName" label="患者姓名" width="150"></el-table-column>
          <el-table-column prop="selfDescription" label="病情自述" width="300"></el-table-column>
          <el-table-column prop="currentMedicalHistory" label="现病史" width="500"></el-table-column>
          <el-table-column prop="currentTreatmentSituation" label="目前治疗情况" width="500"></el-table-column>
          <el-table-column prop="pastMedicalHistory" label="既往病史" width="500"></el-table-column>
          <el-table-column prop="allergyHistory" label="过敏史" width="300"></el-table-column>
          <el-table-column prop="physicalExamination" label="体格检查" width="300"></el-table-column>
          <el-table-column prop="initialDiagnosis" label="初步诊断" width="300"></el-table-column>
          <el-table-column prop="diagnosisResult" label="诊断结果" width="300"></el-table-column>
          <el-table-column prop="inspectionSuggestion" label="检查建议" width="300"></el-table-column>
          <el-table-column prop="precautions" label="预防措施" width="300"></el-table-column>
          <el-table-column prop="deleteTag" label="删除标记" width="100">
            <div slot-scope="scope" style="width: 100%;text-align: center">
              <el-tag v-if="scope.row.deleteTag" type="success" size="small">正常状态</el-tag>
              <el-tag v-else type="danger" size="small">删除状态</el-tag>
            </div>
          </el-table-column>

          <el-table-column
            label="操作"
            fixed="right"
            :render-header="tableAction"
            width="140"
          >
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="info"
                icon="el-icon-info"
                size="small"
                circle
              ></el-button>
              <el-button
                @click="updateMedicalRecord(scope.row)"
                type="primary"
                icon="el-icon-edit"
                size="small"
                circle
              ></el-button>
              <el-button
                @click="deleteMedicalRecord(scope.row)"
                v-if="scope.row.deleteTag != 0 "
                type="danger"
                icon="el-icon-delete"
                circle
                size="small"
              ></el-button>
              <el-button
                @click="deleteMedicalRecord(scope.row)"
                v-else
                icon="el-icon-check"
                circle
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div align="center">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue'
import HelpHint from '@/components/HelpHint.vue'
import ScrollPane from '@/components/ScrollPane.vue'
import { medicalRecordsTotal as medicalRecordsTotalApi, allMedicalRecord as medicalRecordApi, deleteMedicalRecord as deleteMedicalRecordApi } from '../../api/medicalRecord'

import patientTabPane from './components/patientTabPane.vue'
import medicalRecordDiagnosePane from './components/medicalRecordDiagnosePane.vue'
// import prescriptionTemplatePane from './components/prescriptionTemplatePane.vue'
import prescriptionTemplate from './prescriptionTemplate/PrescriptionTemplate.vue'

export default {
  data () {
    return {
      prescriptionTemplateDetails: [],
      patientRegisteredID: '',
      medicalRecordEditChange: '',
      medicalRecordAdderTitle: '病历编写',
      dialogFormVisible: false,
      medicalRecordUpdatterTitle: '病历更新',
      medicalRecordUpdatter: false,
      currentEditMedicalRecord: [],

      prescriptionAdderTitle: '开具处方',
      dialogFormVisiblePrescription: false,
      prescriptionEditChange: '',
      searchParams: {
        medicalRecordID: ''
      },
      tableDataMedicalRecords: [],
      pageSize: 20,
      currentPage: 1,
      pageNum: 1,
      total: 0,
      currentPatient: {
        id: null,
        realName: '',
        registeredID: '',
        medicalRecordID: '',
        gender: '',
        identityNumber: '',
        dateOfBirth: '',
        age: '',
        paymentMethod: '',
        homeAddress: '',
        selectedDepartment: '',
        registeredLevel: '',
        selectedDoctorID: '',
        registrationNoon: '',
        registrationStaff: '',
        buyMedicalRecord: '',
        visitingStatus: 0
      }
    }
  },
  methods: {
    diagnoise () {
      this.patientRegisteredID = this.currentPatient.registeredID
    },
    cancelInfoDisplay () {
      this.currentPatient = {
        id: null,
        realName: '',
        registeredID: '',
        medicalRecordID: '',
        gender: '',
        identityNumber: '',
        dateOfBirth: '',
        age: '',
        paymentMethod: '',
        homeAddress: '',
        selectedDepartment: '',
        registeredLevel: '',
        selectedDoctorID: '',
        registrationNoon: '',
        registrationStaff: '',
        buyMedicalRecord: ''
      }
    },
    getPatientInfo (data) {
      this.currentPatient = data
      // console.log("this.currentPatient");
      // console.log(this.currentPatient);
    },
    searchRegistration () {
      const tableRow = this.$refs.table.$el.querySelectorAll('tbody tr')
      const tableRowHeight = tableRow[1].offsetHeight
      let isjump = false
      for (let i = 0; i < this.tableDataMedicalRecords.length; i++) {
        if (
          this.searchParams.medicalRecordID &&
          this.tableDataMedicalRecords[i].medicalRecordID.indexOf(
            this.searchParams.medicalRecordID
          ) !== -1
        ) {
          tableRow[i].style.backgroundColor = '#99CCCC'
          if (!isjump) {
            scrollTo(0, i * tableRowHeight + 66)
            isjump = true
          }
        } else {
          tableRow[i].style.backgroundColor = '#fff'
        }
      }
    },
    // 条目改变时
    handleCurrentChange (val) {
      this.pageNum = val
      this.refreshMedicalRecord()
    },
    addMedicalRecord () {
      const self = this
      self.dialogFormVisible = true
    },
    addPrescription () {
      const self = this
      self.dialogFormVisiblePrescription = true
    },
    handleClick (row) {
      this.$alert(row, '病历', {
        confirmButtonText: '确定',
        callback: action => {},
        roundButton: true
      })
    },
    tableAction () {
      return this.$createElement(
        'HelpHint',
        {
          props: {
            content: '查看病历 / 编辑病历 / 删除病历 '
          }
        },
        '操作'
      )
    },

    deleteMedicalRecord (row) {
      const self = this
      self
        .$confirm('此操作将删除该病历, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          roundButton: true
        })
        .then(() => {
          deleteMedicalRecordApi({
            id: row.id
          })
            .then(res => {
              self.$notify({
                title: '成功',
                message:
                  '病历名称为 ' + row.medicalRecordName + ' 的病历删除成功',
                type: 'success',
                offset: 60
              })
              self.refreshMedicalRecord()
            })
            .catch(res => {
              console.log('没有删除该病历')
            })
        })
        .catch(() => {})
    },

    refreshMedicalRecord () {
      medicalRecordApi({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          console.log('得到所有病历res')
          console.log(res)
          this.tableDataMedicalRecords = res
        })
        .catch(res => {
          console.log('没有拿到病历')
        })
      this.getMedicalRecordsTotal()
      this.dialogFormVisible = false
    },
    getMedicalRecordsTotal () {
      medicalRecordsTotalApi({})
        .then(res => {
          // console.log("得到所有病历数量res");
          this.total = res[0].medicalRecordsTotal
        })
        .catch(res => {
          console.log('没有拿到病历数量')
        })
    },
    getPrescriptionTemplateDetails (data) {
      this.prescriptionTemplateDetails = data
    }
  },

  created () {
    this.refreshMedicalRecord()
  },

  components: {
    ToolBar,
    HelpHint,
    ScrollPane,
    patientTabPane,
    medicalRecordDiagnosePane,
    prescriptionTemplate
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
