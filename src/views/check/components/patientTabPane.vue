<template>
  <div>
    <el-tabs v-model="activeTabName" @tab-click="changeTab">
      <el-tab-pane label="本人" name="doctor">
        <div style="font-size:13px;color:rgb(130, 192, 192)">未诊患者</div>
        <el-table
          :data="tableDataWaitedPatient"
          border
          ref="waitedTable"
          height="285px"
          style="width: 230px;border-radius:10px;"
          highlight-current-row
          @current-change="getPatientInfo"
          @row-click="getPatientInfo"
        >
          <el-table-column prop="registeredID" label="挂号ID" width="150"></el-table-column>
          <el-table-column prop="realName" label="患者姓名" width="80"></el-table-column>
        </el-table>
        <div style="font-size:13px;color:rgb(130, 192, 192)">已诊患者</div>
        <el-table
          :data="tableDataVisitedPatient"
          border
          ref="visitedTable"
          height="288px"
          style="width: 230px;border-radius:10px;"
          highlight-current-row
          @current-change="getPatientInfo"
          @row-click="getPatientInfo"
        >
          <el-table-column prop="registeredID" label="挂号ID" width="150"></el-table-column>
          <el-table-column prop="realName" label="患者姓名" width="80"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="科室" name="department">
        <div style="font-size:13px;color:rgb(130, 192, 192)">未诊患者</div>
        <el-table
          :data="tableDataWaitedPatient"
          border
          ref="table"
          height="285px"
          style="width: 230px;border-radius:10px;"
          highlight-current-row
          @current-change="getPatientInfo"
          @row-click="getPatientInfo"
        >
          <el-table-column prop="registeredID" label="挂号ID" width="150"></el-table-column>
          <el-table-column prop="realName" label="患者姓名" width="80"></el-table-column>
        </el-table>
        <div style="font-size:13px;color:rgb(130, 192, 192)">已诊患者</div>
        <el-table
          :data="tableDataVisitedPatient"
          border
          ref="table"
          height="288px"
          style="width: 230px;border-radius:10px;"
          highlight-current-row
          @current-change="getPatientInfo"
          @row-click="getPatientInfo"
        >
          <el-table-column prop="registeredID" label="挂号ID" width="150"></el-table-column>
          <el-table-column prop="realName" label="患者姓名" width="80"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getWaitedPatientByDoctor as getWaitedPatientByDoctorApi,
  getVisitedPatientByDoctor as getVisitedPatientByDoctorApi,
  getWaitedPatientByDepartment as getWaitedPatientByDepartmentApi,
  getVisitedPatientByDepartment as getVisitedPatientByDepartmentApi
} from '../../../api/user'

import { getUserInfo } from '../../../utils/dataStorage'

export default {
  name: 'PatientTabPane',
  components: {},
  mounted () {
    this.getWaitedPatientByDoctor()
    this.getVisitedPatientByDoctor()
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      currentPatient: null,
      activeTabName: 'doctor',
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
    data: {
      // handler() {}
    }
  },
  methods: {
    searchPatient (patientName) {
      const tableRow = this.$refs.waitedTable.$el.querySelectorAll('tbody tr')
      for (let i = 0; i < this.tableDataWaitedPatient.length; i++) {
        if (
          patientName &&
          this.tableDataWaitedPatient[i].realName.indexOf(patientName) !== -1
        ) {
          tableRow[i].style.backgroundColor = '#99CCCC'
        } else {
          tableRow[i].style.backgroundColor = '#fff'
        }
      }
    },
    getPatientInfo (row) {
      this.currentPatient = row
      this.$emit('getPatient', this.currentPatient)
    },
    changeTab (tab, event) {
      if (this.activeTabName === 'doctor') {
        this.getWaitedPatientByDoctor()
        this.getVisitedPatientByDoctor()
      } else {
        this.getWaitedPatientByDepartment()
        this.getVisitedPatientByDepartment()
      }
    },
    getWaitedPatientByDoctor () {
      getWaitedPatientByDoctorApi({
        doctorID: getUserInfo().user_ID
      })
        .then(res => {
          this.tableDataWaitedPatient = res.result
        })
        .catch(res => {})
    },
    getVisitedPatientByDoctor () {
      getVisitedPatientByDoctorApi({
        doctorID: getUserInfo().user_ID
      })
        .then(res => {
          // console.log("getVisitedPatientByDoctor");
          // console.log(res);
          this.tableDataVisitedPatient = res.result
        })
        .catch(res => {})
    },
    getWaitedPatientByDepartment () {
      getWaitedPatientByDepartmentApi({
        doctorID: getUserInfo().user_ID
      })
        .then(res => {
          // console.log("getWaitedPatientByDepartment");
          // console.log(res);
          this.tableDataWaitedPatient = res
        })
        .catch(res => {})
    },
    getVisitedPatientByDepartment () {
      getVisitedPatientByDepartmentApi({
        doctorID: getUserInfo().user_ID
      })
        .then(res => {
          // console.log("getVisitedPatientByDepartment");
          // console.log(res);
          this.tableDataVisitedPatient = res
        })
        .catch(res => {})
    }
  }
}
</script>
<style lang="scss">
</style>
