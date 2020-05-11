<template>
  <div class="chart-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="统计日期">
        <el-date-picker
          v-model="formInline.value2"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round size="small" @click="searchdepartment">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round size="small" @click="cleardepartment">清空</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round size="small" @click="derivedepartment">导出</el-button>
      </el-form-item>
    </el-form>

    <div style="margin-bottom:10px;">门诊科室工作量统计</div>

    <el-table :data="tableData" height="200px" style="margin-bottom:10px;border-radius:10px;">
      <el-table-column prop="departmentName" label="医生姓名" width="150"></el-table-column>
      <el-table-column prop="medicalFee" label="医药费" ></el-table-column>
      <el-table-column prop="projectFee" label="项目费"></el-table-column>
      <el-table-column prop="RegFee" label="挂号费"></el-table-column>
      <el-table-column prop="medNumber" label="看诊人次" ></el-table-column>
      <el-table-column prop="invoiceNumber" label="发票数量"></el-table-column>
      <el-table-column prop="totalFee" label="费用总计" width="150"></el-table-column>
    </el-table>

    <doctorWorkloadStatisticsChart name="科室工作量统计" height="80%" width="100%" />
  </div>
</template>

<script>
import doctorWorkloadStatisticsChart from './components/doctorWorkloadStatisticsChart'

export default {
  name: 'DepartmentWorkloadStatistics',
  components: { doctorWorkloadStatisticsChart },
  data () {
    return {
      tableData: [],
      formInline: {
        value2: ''
      }
    }
  },
  methods: {
    searchdepartment () {
      console.log(this.formInline.value2)
      if (this.formInline.value2 === '') {
        this.$message({
          type: 'error',
          message: '日期区间为空 无法查询'
        })
      } else if (this.tableData.length > 0) {
        this.$message({
          type: 'error',
          message: '请先清空 再查询'
        })
      } else {
        this.tableData.push(
          {
            departmentName: '内科',
            medicalFee: 40,
            projectFee: 156,
            RegFee: 4,
            medNumber: 12,
            invoiceNumber: 5,
            totalFee: 200
          },
          {
            departmentName: '妇产科',
            medicalFee: 38,
            projectFee: 124,
            RegFee: 6,
            medNumber: 11,
            invoiceNumber: 4,
            totalFee: 168
          },
          {
            departmentName: '全科诊室',
            medicalFee: 41,
            projectFee: 100,
            RegFee: 9,
            medNumber: 7,
            invoiceNumber: 6,
            totalFee: 150
          },
          {
            departmentName: '全科门诊',
            medicalFee: 16,
            projectFee: 56,
            RegFee: 4,
            medNumber: 5,
            invoiceNumber: 3,
            totalFee: 76
          }
        )
        this.$message({
          type: 'success',
          message: '查询到相关记录'
        })
      }
    },
    cleardepartment () {
      if (this.tableData.length <= 0) {
        this.$message({
          type: 'error',
          message: '表格已经清空'
        })
      } else {
        this.tableData = []
        this.$message({
          type: 'success',
          message: '表格成功清空'
        })
      }
    },
    derivedepartment () {
      if (this.tableData.length <= 0) {
        this.$message({
          type: 'error',
          message: '图表为空 无法导出'
        })
      } else {
        this.$message({
          type: 'success',
          message: '导出成功'
        })
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
