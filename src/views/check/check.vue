<template>
  <div>
    <ToolBar style="border-radius:15px;margin:5px;">
      <div style="display:flex;flex-direction:column;">
        <div style="margin:0 0 10px 10px;">
          <el-input
            placeholder="搜索患者"
            size="small"
            style="width: 200px;"
            v-model="searchParams.patientName"
            @clear="searchPatient"
            clearable
          ></el-input>
          <el-button
            style="background-color: rgb(210, 235, 230);margin-left:10px;"
            icon="el-icon-search"
            size="small"
            round
            @click="searchPatient"
          >查询患者</el-button>
        </div>
        <div style="display:flex;flex-direction:row;">
          <!-- 左边aside： 患者 已诊未诊 tabpane -->
          <el-card class="box-card patientTabPane" shadow="hover" body-style="padding:5px">
            <patientTabPane
              ref="patientTabPane"
              style="width:230px;border-radius:15px;"
              @getPatient="getPatientInfo"
            ></patientTabPane>
          </el-card>

          <!-- 右边aside： -->
          <div style="display:flex;flex-direction:column;margin:5px;font-size:14px;">
            <div style="display:flex;flex-direction:row;font-size:14px;">
              <!-- 项目列表 Card -->
              <el-card class="box-card" shadow="hover" body-style="width:650px;">
                <header>项目表格</header>
                <vxe-table
                  border
                  resizable
                  show-overflow
                  row-id="id"
                  :data.sync="medicalTechnologyTable"
                  style="border-radius:10px;"
                >
                  >
                  <vxe-table-column type="index" width="30"></vxe-table-column>
                  <vxe-table-column field="medicalTechnologyID" title="项目编码"></vxe-table-column>
                  <vxe-table-column field="medicalTechnologyName" title="医技名称"></vxe-table-column>
                  <vxe-table-column field="medicalTechnologySpecifications" title="医技规格"></vxe-table-column>
                  <vxe-table-column field="hasPaid" title="是否付费">
                    <template v-slot="{ row }">
                      <span type="text">{{ row.hasPaid?'是':'否' }}</span>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column field="fee" title="项目费用"></vxe-table-column>
                  <vxe-table-column title="操作">
                    <template v-slot="{ row }">
                      <el-button
                        style="background-color:#FFCCCC;"
                        round
                        :disabled="row.executed"
                        size="small"
                        @click="confirmExecute(row)"
                      >{{ row.executed?'已执行':'确认执行' }}</el-button>
                    </template>
                  </vxe-table-column>
                </vxe-table>
              </el-card>
              <!-- 患者信息 Card -->
              <el-card
                class="box-card"
                style="margin-left:10px;"
                shadow="hover"
                body-style="width:350px;opacity:0.99;"
              >
                <div class="patientInfoBg"></div>
                <div style="opacity:0.99;">
                  <div slot="header" style="height:20px;">
                    <span>患者信息</span>
                    <el-button
                      style="float: right; padding: 10px;background-color:#FFCCCC;opacity:0.99"
                      round
                      @click="cancelExecute"
                    >取 消 执 行</el-button>
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
                    <div v-if="currentPatient.registeredLevel=='' " style="float:right;">
                      <el-tag style="border-radius:20px" type="info" size="small">请选择患者</el-tag>
                    </div>
                    <div v-else>
                      <el-tag
                        v-if="currentPatient.registeredLevel=='zjh' "
                        style="border-radius:20px"
                        type="success"
                        size="small"
                      >专家号</el-tag>
                      <el-tag v-else style="border-radius:20px" type="warning" size="small">普通号</el-tag>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
            <div style="display:flex;flex-direction:column;flex:1;">
              <!-- 输入结果 Card -->
              <el-card
                class="box-card"
                style="margin:10px 0"
                shadow="hover"
                body-style="height:500px;"
              >
                <div class>检查结果录入</div>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 7}"
                  placeholder="请输入检查结果及相关图片"
                  v-model="result"
                  show-word-limit
                ></el-input>
                <!-- 图片上传 -->
                <el-upload
                  style="margin-top:10px;width:50px;height:50px;"
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                >
                  <i slot="default" class="el-icon-plus"></i>
                  <div slot="file" slot-scope="{file}">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <i class="el-icon-zoom-in"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <i class="el-icon-download"></i>
                      </span>
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <i class="el-icon-delete"></i>
                      </span>
                    </span>
                  </div>
                </el-upload>
                <div style="display:flex;justify-content:flex-end;margin-top:15px;">
                  <el-button style="padding:10px;background-color:#99CCCC;" round>结果录入</el-button>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
    </ToolBar>
  </div>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue'
import HelpHint from '@/components/HelpHint.vue'
import ScrollPane from '@/components/ScrollPane.vue'

import patientTabPane from './components/patientTabPane.vue'

import { getPatientMT as getPatientMTApi } from '../../api/medicalTechnology'
export default {
  components: {
    ToolBar,
    HelpHint,
    ScrollPane,
    patientTabPane
  },
  data () {
    return {
      patientRegisteredID: '',
      medicalRecordEditChange: '',
      medicalRecordAdderTitle: '病历编写',
      dialogFormVisible: false,
      medicalRecordUpdatterTitle: '病历更新',
      medicalRecordUpdatter: false,
      currentEditMedicalRecord: [],

      dialogFormVisiblePrescription: false,
      searchParams: {
        patientName: ''
      },
      tableDataMedicalRecords: [],
      medicalTechnologyTable: [],
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
      },
      result: ''
    }
  },
  created () {},

  methods: {
    searchPatient () {
      this.$refs.patientTabPane.searchPatient(this.searchParams.patientName)
    },
    diagnoise () {
      this.patientRegisteredID = this.currentPatient.registeredID
    },
    getPatientInfo (data) {
      this.currentPatient = data
      this.getMTProject()
    },
    getMTProject () {
      getPatientMTApi().then(res => {
        this.medicalTechnologyTable = res.result
      })
    },
    confirmExecute (row) {
      this.medicalTechnologyTable.forEach(item => {
        if (row.medicalTechnologyID === item.medicalTechnologyID) {
          item.executed = 1
        }
      })
    },
    cancelExecute () {
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
    // 条目改变时
    handleCurrentChange (val) {
      this.pageNum = val
      this.refreshMedicalRecord()
    }
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
