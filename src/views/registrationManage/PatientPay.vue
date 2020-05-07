<template>
  <div class="patientPay">
    <div class="patientPayBg">
    </div>
    <el-form :inline="true" :model="form" style="margin-top:50px;opacity:0.99">
      <el-form-item label="病历号*">
        <el-input size="small" v-model="form.medicalRecordID" @input="refreshPrescription" placeholder="此处填写病历号"></el-input>
      </el-form-item>
      <el-form-item label="处方ID*">
        <el-input v-model="form.prescriptionID" size="small" disabled placeholder="此处填写处方ID"></el-input>
      </el-form-item>
      <!-- <el-form-item label="操作员ID*">
                    <el-input
                        v-model="form.operatorStaffID"
                        placeholder="此处填写操作员ID"
                    ></el-input>
                </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer" style="opacity:0.99">
      <el-button round @click="reset">重 置</el-button>
      <el-button round type="primary" @click="openInvoice">确 定</el-button>
    </div>
    <!-- 发票明细 -->
    <el-dialog
      title="发票明细"
      :visible="dialogFormVisible"
      width="45%">
      <el-form :inline="true" :model="form" style="opacity:0.99">
        <el-form-item label="病历号*">
          <el-input v-model="form.medicalRecordID" disabled size="small" @input="refreshPrescription" placeholder="此处填写病历号"></el-input>
        </el-form-item>
        <el-form-item label="处方ID*">
          <el-input v-model="form.prescriptionID" size="small" disabled placeholder="此处填写处方ID"></el-input>
        </el-form-item>
        <el-form-item label="处方名称*">
          <el-input v-model="dialogForm.prescriptionName" size="small" disabled placeholder="此处填写处方名称"></el-input>
        </el-form-item>
        <el-form-item label="支付方式*">
          <el-select
            v-model="dialogForm.paymentMethod"
            size="small"
            clearable
            placeholder="请选择支付方式*"
          >
            <el-option label="现金" value="XJ"></el-option>
            <el-option label="医保卡" value="YBK"></el-option>
            <el-option label="银行卡" value="YHK"></el-option>
            <el-option label="信用卡" value="XYK"></el-option>
            <el-option label="微信" value="WX"></el-option>
            <el-option label="支付宝" value="ZFB"></el-option>
            <el-option label="云闪付" value="YSF"></el-option>
            <el-option label="其它" value="QT"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="应收金额*">
          <el-tag
            style="background-color:rgb(218, 235, 235);color:#339999"
            size="medium"
          >{{ prescriptionFee }}</el-tag>
        </el-form-item>
        <el-form-item label="实收金额*">
          <el-input v-model="dialogForm.fee" size="small"></el-input>
        </el-form-item>
        <el-form-item label="找零金额*">
          <el-tag
            style="background-color:rgb(218, 235, 235);color:#339999"
            size="medium"
          >{{ change }}</el-tag>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="dialogFormVisible=false">取 消</el-button>
        <el-button round type="primary" :loading="btnLoading" @click="btnOk">收 费</el-button>
      </div>
    </el-dialog>

    <div class="animated fadeInUp" style="opacity:0.5;float:right;margin-right:10px;">
      <div style="color:#666699;margin:10px;">处方</div>
      <el-card shadow="hover" style="width:420px;" body-style="padding:0px">
        <vxe-table
          border
          resizable
          show-overflow
          row-id="id"
          :data.sync="tableDataMedicinePrescription"
          max-height="200px"
          style="border-radius:15px;"
        >
          <vxe-table-column
            field="medicalRecordID"
            title="病历号"
            width="70"
          ></vxe-table-column>
          <vxe-table-column
            field="registeredID"
            title="挂号ID"
            width="75"
          ></vxe-table-column>
          <vxe-table-column
            field="prescriptionName"
            title="处方名"
            width="90"
          ></vxe-table-column>
          <vxe-table-column
            field="creationTime"
            title="开具时间"
            width="100"
          ></vxe-table-column>
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
      <div style="color:#666699;margin-top:10px;">处方明细</div>
      <el-card shadow="hover" style="width:420px;margin-top:10px;" body-style="padding:0px">
        <vxe-table
          border
          resizable
          show-overflow
          row-id="id"
          :data.sync="tableDataMedicinePrescriptionDetails"
          max-height="200px"
          style="border-radius:15px;"
        >
          <vxe-table-column type="selection" width="30"></vxe-table-column>
          <vxe-table-column
            field="prescriptionName"
            title="处方名称"
            width="140"
          ></vxe-table-column>
          <vxe-table-column
            field="drugName"
            title="药品名称"
            width="100"
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
        </vxe-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { patientPay as patientPayApi } from '../../api/content'
import { getUserInfo } from '../../utils/dataStorage'
import { getPrescriptionByMedicalRecordID as getPrescriptionByMedicalRecordIDApi } from '../../api/prescription'
import { getPrescriptionDetailsByPrescriptionID as getPrescriptionDetailsByPrescriptionIDApi } from '../../api/prescriptionDetails'

export default {
  data () {
    return {
      dialogFormVisible: false,
      tableDataMedicinePrescription: [],
      tableDataMedicinePrescriptionDetails: [],
      form: {
        id: null,
        medicalRecordID: '',
        prescriptionID: '',
        operatorStaffID: ''
      },
      dialogForm: {
        prescriptionName: '',
        paymentMethod: '',
        fee: 0
      },
      btnLoading: false
    }
  },
  watch: {
    data: {
      handler: function () {}
    }
  },
  computed: {
    prescriptionFee () {
      // 计算处方各个药品总费用
      let fee = 0
      this.tableDataMedicinePrescriptionDetails.forEach(e => {
        fee += e.drugUnitPrice * e.amount
      })
      return fee
    },
    change () {
      // 找零
      return this.dialogForm.fee - this.prescriptionFee
    }
  },
  methods: {
    reset () {
      this.form = {
        id: null,
        medicalRecordID: '',
        prescriptionID: '',
        operatorStaffID: ''
      }
      this.tableDataMedicinePrescription = []
      this.tableDataMedicinePrescriptionDetails = []
    },
    openInvoice () {
      if (this.form.medicalRecordID === '') {
        this.$message('请填写病历号')
      } else if (this.form.prescriptionID === '') {
        this.$message('请选择处方ID')
      } else if (
        this.form.medicalRecordID !== '' &&
        this.form.prescriptionID !== ''
      ) {
        this.dialogFormVisible = true
      }
    },
    handleClick (row, scope) {
      this.form.prescriptionID = row.prescriptionID
      this.dialogForm.prescriptionName = row.prescriptionName
      getPrescriptionDetailsByPrescriptionIDApi({
        registeredID: row.registeredID
      })
        .then(res => {
          if (res === '') {
            this.$message('该挂号ID不存在喔~~')
          } else {
            this.tableDataMedicinePrescriptionDetails = res
          }
        })
        .catch(res => {})
    },
    refreshPrescription () {
      getPrescriptionByMedicalRecordIDApi({
        medicalRecordID: this.form.medicalRecordID
      })
        .then(res => {
          this.tableDataMedicinePrescription = res
        })
        .catch(res => {})
    },
    btnOk () {
      this.form.operatorStaffID = getUserInfo().user_ID
      if (this.form.prescriptionID === '') {
        this.$message('处方ID不可以为空喔~~')
      } else if (this.form.operatorStaffID === '') {
        this.$message('操作员ID不可以为空喔~~')
      } else if (
        this.form.prescriptionID !== '' &&
        this.form.operatorStaffID !== ''
      ) {
        this.btnLoading = true
        patientPayApi({
          prescriptionID: this.form.prescriptionID,
          operatorStaffID: this.form.operatorStaffID
        })
          .then(res => {
            if (res[0].status === 200) {
              console.log('添加缴费成功')
              this.$message('您填写的缴费添加成功了喔~~')
              this.$emit('refreshRegistrations')
            } else if (res[0].status === 1) {
              this.$message('未查询到此处方ID~~')
            } else if (res[0].status === 2) {
              this.$message('未查询到操作员ID~~请检查选择')
            } else if (res[0].status === 3) {
              this.$message('该处方已缴过费用~~')
            } else if (res[0].status === 4) {
              this.$message('该处方已退过费用~~')
            }
          })
          .catch(res => {})
      }
      this.btnLoading = false
    }
  },
  mounted: {},
  components: {}
}
</script>
<style lang="scss">
@import "vxe-table/styles/variable.scss";
$vxe-font-color: #69bbc4;
$vxe-zindex: 3000; // 对于在某些场景中，由于堆叠被覆盖时可能会用到
@import "vxe-table/styles/default.scss";
.patientPay {
  text-align: center;
  background-color: #b0eae7;
  padding-top: 5px;
  height: 600px;
  border-radius: 15px;
  .el-cascader {
    width: 100%;
  }
}

.patientPayBg {
  position: absolute;
  height: 450px;
  width: 650px;
  margin: auto;
  background-image: url("https://i.loli.net/2019/09/16/pyVFnlIdt5Nmf9o.gif");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 15px;
}
</style>
