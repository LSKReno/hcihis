<template>
  <div class="fee-top">
    <!--{{drugFee.id}}-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top:10px">
      <el-form-item>
        <el-input v-model="formInline.feeName" placeholder="请输入要查询的费用科目" size="small" @input="searchforitem"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round size="small" @click="searchforitem">查询</el-button>
      </el-form-item>
      <el-form-item style="margin-left:10px;">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          round
          @click="dialogFormVisible = true"
        >添加费用科目</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="添加费用科目" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="费用ID">
          <el-input v-model="form.feeID" autocomplete="off" placeholder="请填写费用ID"></el-input>
        </el-form-item>
        <el-form-item label="费用科目">
          <el-input v-model="form.feename" autocomplete="off" placeholder="请填写费用科目"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="dialogFormVisible = false">取 消</el-button>
        <el-button round type="primary" @click="Addfeeitem">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" height="455px" style="border-radius:10px;" border>
      <el-table-column prop="projectID" label="收费科目ID" width="100"></el-table-column>
      <el-table-column prop="projectName" label="收费科目名称"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" round @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            round
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑费用科目" :visible.sync="dialogFormvisible">
      <el-form :model="Form">
        <el-form-item label="费用ID">
          <el-input v-model="Form.FeeID" autocomplete="off" placeholder="请填写费用ID"></el-input>
        </el-form-item>
        <el-form-item label="费用科目名称">
          <el-input v-model="Form.Feename" autocomplete="off" placeholder="请填写费用科目"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="dialogFormvisible = false">取 消</el-button>
        <el-button round type="primary" @click="Edit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  feeForm as feeFormApi
} from '../../api/fee'

var _index

export default {
  name: 'FeeManage',
  components: {},
  data () {
    return {
      dialogFormVisible: false,
      dialogFormvisible: false,
      drugFee: {},
      form: {
        feename: '',
        feeID: ''
      },
      Form: {
        Feename: '',
        FeeID: ''
      },
      formInline: {
        feeName: ''
      },
      slist: [],
      tableData: [
        {
          projectID: 1,
          projectName: '医药费'
        },
        {
          projectID: 2,
          projectName: '项目费'
        },
        {
          projectID: 3,
          projectName: '挂号费'
        },
        {
          projectID: 4,
          projectName: '诊疗费'
        }
      ]
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    deleteRow (index, rows) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rows.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })

      // rows.splice(index, 1);
      // this.$message("删除成功")
    },
    handleEdit (index, row) {
      this.dialogFormvisible = true
      _index = index

      console.log(index, row)
    },
    Edit () {
      var editData = _index
      this.tableData[editData].projectID = this.Form.FeeID
      this.tableData[editData].projectName = this.Form.Feename
      this.dialogFormvisible = false
      this.$message('编辑成功')
    },
    Search () {},
    Addfeeitem () {
      this.tableData.push({
        projectID: this.form.feeID,
        projectName: this.form.feename
      })
      this.dialogFormVisible = false
      this.$message('添加成功')
      // addFeeApi({
      //     feename:this.formInline.feeName
      // }).then(res=>{
      //     this.tableData=res;
      // })
    },
    Feecreated () {
      feeFormApi({}).then(res => {
        this.tableData = res
      })
    },
    setSlist (arr) {
      this.tableData = JSON.parse(JSON.stringify(arr))
    },
    searchforitem (e) {
      // var e = this.formInline.feeName;
      if (this.formInline.feeName != null) {
        var ss = []
        this.tableData.forEach(function (item) {
          if (item.projectName.indexOf(e) > -1) {
            ss.push(item)
          }
        })
        this.setSlist(ss)
      } else {
        this.setSlist(this.tableData)
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
