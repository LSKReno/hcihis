<template>
  <div class="fee-top">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="日结医生输入">
        <el-input v-model="formInline.doctorName" placeholder="请输入要日结的医生" size="small" @input="searchforitem"></el-input>
      </el-form-item>
      <el-form-item label="统计日期">
        <el-date-picker
          v-model="formInline.value3"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" round @click="searchforsettle">查询</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" size="small" round @click="dailysettlement">日结</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" height="250px" style="border-radius:10px;">
      <el-table-column prop="segone" label width="150"></el-table-column>
      <el-table-column prop="segtwo" label width="300"></el-table-column>
      <el-table-column prop="segthree" label="门诊收费日结单" width="150"></el-table-column>
      <el-table-column prop="segfour" label width="150"></el-table-column>
      <el-table-column prop="segfive" label width="150"></el-table-column>
      <el-table-column prop="segsix" label width="150"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Doctordailysettle',
  components: {},
  data () {
    return {
      formInline: {
        doctorName: '',
        value3: []
      },
      tableData: []
    }
  },
  created () {},
  mounted () {},
  methods: {
    searchforsettle () {
      if (this.formInline.doctorName === '' || this.formInline.value3 === '') {
        this.$message({
          type: 'error',
          message: '搜索条件不全 无法搜索'
        })
      } else if (
        this.formInline.doctorName !== '' &&
        this.formInline.value3 !== '' &&
        this.tableData.length <= 0
      ) {
        // console.log(this.formInline.value3)
        this.tableData.push(
          {
            segone: '日结时间范围',
            segtwo: this.formInline.value3.toString(),
            segthree: '',
            segfour: '',
            segfive: '',
            segsix: ''
          },
          {
            segone: '收费员',
            segtwo: this.formInline.doctorName,
            segthree: '',
            segfour: '',
            segfive: '',
            segsix: ''
          },
          {
            segone: '起始发票号',
            segtwo: 20175034,
            segthree: '发票数量',
            segfour: 6,
            segfive: '',
            segsix: ''
          },
          {
            segone: '总金额',
            segtwo: 300.0,
            segthree: '自费金额',
            segfour: 100,
            segfive: '优惠金额',
            segsix: 200
          }
        )
        this.$message({
          type: 'success',
          message: '查询到该医生日结信息'
        })
      } else if (this.tableData.length > 0) {
        this.$message({
          type: 'error',
          message: '请重新输入查询条件'
        })
        this.tableData = []
        this.formInline.doctorName = ''
        this.formInline.value3 = ''
      }
    },
    dailysettlement () {
      if (this.tableData.length <= 0) {
        this.$message({
          type: 'error',
          message: '日结表为空无法导出'
        })
      } else {
        this.$message({
          type: 'success',
          message: '财务信息已成功入库'
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
