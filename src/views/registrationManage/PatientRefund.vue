<template >
  <div class="patientRefund">
    <div class="patientRefundBg">
    </div>
    <el-form :inline="true" :model="form" style="opacity:0.99">
      <el-form-item label="挂号ID*">
        <el-input v-model="form.registeredID" @input="refreshPrescriptionDetails" placeholder="此处填写处方ID"></el-input>
      </el-form-item>
      <el-form-item label="药品名称*">
        <el-input v-model="form.drugName" disabled placeholder="此处填写药品名称"></el-input>
      </el-form-item>
      <el-form-item label="药品ID*">
        <el-input v-model="form.drugID" disabled placeholder="此处填写药品ID"></el-input>
      </el-form-item>
      <el-form-item label="发票ID*">
        <el-input v-model="form.invoiceID" placeholder="此处填写发票ID"></el-input>
      </el-form-item>
      <!-- <el-form-item label="操作员ID*">
                    <el-input
                        v-model="form.operatorStaffID"
                        placeholder="此处填写操作员ID"
                    ></el-input>
                </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer" style="opacity:0.99">
      <el-button round @click="reset">取 消</el-button>
      <el-button round type="primary" :loading="btnLoading" @click="btnOk">确 定</el-button>
    </div>

    <div class="animated fadeInUp" style="opacity:0.5;float:right;margin-right:10px;">
      <el-card shadow="hover" style="width:540px;margin-top:10px;" body-style="padding:0px">
        <vxe-table
          border
          resizable
          show-overflow
          row-id="id"
          :data.sync="tableDataMedicinePrescriptionDetails"
          max-height="200px"
          style="border-radius:15px;"
        >
          <vxe-table-column
            field="prescriptionName"
            title="处方名称"
            width="140"
          ></vxe-table-column>
          <vxe-table-column
            field="drugName"
            title="药品名称"
            width="80"
          ></vxe-table-column>
          <vxe-table-column
            field="drugUnitPrice"
            title="药品单价"
            width="80"
          ></vxe-table-column>
          <vxe-table-column
            field="amount"
            title="药品数"
            width="70"
          ></vxe-table-column>
          <vxe-table-column
            field="drugStatus"
            title="药品状态"
            width="80"
          >
            <div slot-scope="scope" style="width: 100%;text-align: center">
              <el-tag v-if="scope.row.drugStatus==1" type="success" size="small">已开立</el-tag>
              <el-tag v-if="scope.row.drugStatus==2" type="success" size="small">已缴费</el-tag>
              <el-tag v-if="scope.row.drugStatus==3" type="success" size="small">已发药</el-tag>
              <el-tag v-if="scope.row.drugStatus==4" type="success" size="small">已退费</el-tag>
            </div>
          </vxe-table-column>
          <vxe-table-column
            title="操作"
            width="90"
          ><template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row,scope)"
              size="small"
              type="primary"
              round
            >选择</el-button>
          </template></vxe-table-column>
        </vxe-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { patientRefund as patientRefundApi } from '../../api/content'
import { getUserInfo } from '../../utils/dataStorage'
import { getPrescriptionDetailsByPrescriptionID as getPrescriptionDetailsByPrescriptionIDApi } from '../../api/prescriptionDetails'

export default {
  data () {
    return {
      tableDataMedicinePrescriptionDetails: [],
      form: {
        id: null,
        registeredID: '',
        drugID: '',
        invoiceID: '',
        operatorStaffID: ''
      },
      btnLoading: false
    }
  },
  watch: {
    data: {
      handler: function () {}
    }
  },
  methods: {
    reset () {
      this.form = {
        id: null,
        registeredID: '',
        drugID: '',
        drugName: '',
        invoiceID: '',
        operatorStaffID: ''
      }
      this.tableDataMedicinePrescriptionDetails = []
    },
    handleClick (row, scope) {
      // console.log(scope.$rowIndex)
      this.form.drugID = row.drugID
      this.form.drugName = row.drugName
    },
    refreshPrescriptionDetails () {
      getPrescriptionDetailsByPrescriptionIDApi({
        registeredID: this.form.registeredID
      })
        .then(res => {
          console.log(res)
          this.tableDataMedicinePrescriptionDetails = res
        })
        .catch(res => {})
    },
    btnOk () {
      this.form.operatorStaffID = getUserInfo().user_ID
      if (this.form.registeredID === '') {
        this.$message('挂号ID不可以为空喔~~')
      } else if (this.form.drugID === '') {
        this.$message('药品ID不可以为空喔~~')
      } else if (this.form.invoiceID === '') {
        this.$message('发票ID不可以为空喔~~')
      } else if (this.form.operatorStaffID === '') {
        this.$message('操作员ID不可以为空喔~~')
      } else if (
        this.form.registeredID !== '' &&
        this.form.drugID !== '' &&
        this.form.invoiceID !== '' &&
        this.form.operatorStaffID !== ''
      ) {
        this.btnLoading = true
        patientRefundApi({
          registeredID: this.form.registeredID,
          drugID: this.form.drugID,
          invoiceID: this.form.invoiceID,
          operatorStaffID: this.form.operatorStaffID
        })
          .then(res => {
            if (res[0].status === 200) {
              console.log('添加退药费成功')
              this.$message('您填写的退药费添加成功了喔~~')
              this.$emit('refreshCancelRegistrations')
            } else if (res[0].status === 1) {
              this.$message('未查询到此挂号ID~~')
            } else if (res[0].status === 2) {
              this.$message('未查询到此操作员ID~~')
            } else if (res[0].status === 3) {
              this.$message('该处方未缴费~~')
            } else if (res[0].status === 4) {
              this.$message('该药品未缴费~~')
            } else if (res[0].status === 5) {
              this.$message('该药品已退费~~')
            } else if (res[0].status === 6) {
              this.$message('所输入发票ID与处方明细中drugID不同~~')
            }
          })
          .catch(res => {})
      }
      this.btnLoading = false

      this.form = {
        id: null,
        registeredID: '',
        drugID: '',
        invoiceID: '',
        operatorStaffID: ''
      }
    }
  }
}
</script>
<style lang="scss" >
@import "vxe-table/styles/variable.scss";
$vxe-font-color: #69bbc4;
$vxe-zindex: 3000; // 对于在某些场景中，由于堆叠被覆盖时可能会用到
@import "vxe-table/styles/default.scss";
.patientRefund {
  text-align: center;
  padding: 20px;
  background-color: #94d6de;
  height: 500px;
  border-radius: 15px;
  .el-cascader {
    width: 100%;
  }
}

.patientRefundBg {
  position: absolute;
  height: 450px;
  width: 700px;
  margin: auto;
  background-image: url("https://i.loli.net/2019/09/16/7JdlsV1EhwktWS6.gif");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 50px;
  border-radius: 15px;
}
</style>
