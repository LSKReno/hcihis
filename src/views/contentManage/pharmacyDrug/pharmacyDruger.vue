<template>
  <div class="pharmacyDrug-dialog">
    <div style="text-align:center;position:fixed;z-index:0">
      <img src="https://i.loli.net/2019/09/06/NS7rMvRkToB3JLn.png" style="width:40%;opacity:0.4" />
    </div>
    <el-row>
      <el-col>
        <el-form :inline="true" :model="form" style="opacity:0.99">
          <el-form-item label="挂号ID*">
            <el-input v-model="form.registeredID" size="small" @input="refreshPrescriptionDetails" placeholder="此处填写挂号ID"></el-input>
          </el-form-item>
          <el-form-item label="药品ID*">
            <el-input v-model="form.drugID" size="small" disabled placeholder="此处填写药品ID"></el-input>
          </el-form-item>

        </el-form>
        <!-- <div slot="footer" class="dialog-footer" style="opacity:0.99"> -->
        <el-button round size="small" @click="reset">重 置</el-button>
        <el-button round type="primary" :loading="btnLoading" size="small" @click="btnOk">确 定</el-button>
        <!-- </div> -->
      </el-col>
      <el-col>
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
      </el-col>

    </el-row>
  </div>
</template>

<script>
import { pharmacyDrug as pharmacyDrugApi } from '../../../api/content'
import { getPrescriptionDetailsByPrescriptionID as getPrescriptionDetailsByPrescriptionIDApi } from '../../../api/prescriptionDetails'

export default {
  name: 'PharmacyDruger',
  props: {
    dialogFormVisible: Boolean,
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tableDataMedicinePrescriptionDetails: [],
      props: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      form: {
        id: null,
        registeredID: '',
        drugID: ''
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
        drugID: ''
      }
      this.tableDataMedicinePrescriptionDetails = []
    },
    handleClick (row, scope) {
      // console.log(scope.$rowIndex)
      this.form.drugID = row.drugID
    },
    refreshPrescriptionDetails () {
      getPrescriptionDetailsByPrescriptionIDApi({
        registeredID: this.form.registeredID
      })
        .then(res => {
            // console.log(res)
          this.tableDataMedicinePrescriptionDetails = res
        })
        .catch(res => {})
    },
    btnOk () {
      if (this.form.registeredID === '') {
        this.$message('挂号ID不可以为空喔~~')
      } else if (this.form.drugID === '') {
        this.$message('药品ID不可以为空喔~~')
      } else if (this.form.prescriptionID !== '' && this.form.drugID !== '') {
        this.btnLoading = true
        pharmacyDrugApi({
          registeredID: this.form.registeredID,
          drugID: this.form.drugID
        })
          .then(res => {
            if (res[0].status === 200) {
              console.log('发药成功')
              this.refreshPrescriptionDetails()
              this.$message('您填写的发药信息添加成功了喔~~')
              this.$emit('refreshDrugs')
            } else if (res[0].status === 1) {
              this.$message('未查询到此挂号ID~~')
              this.$emit('refreshDrugs')
            } else if (res[0].status === 2) {
              this.$message('药品未缴费~~')
              this.$emit('refreshDrugs')
            } else if (res[0].status === 3) {
              this.$message('药品已发放~~')
              this.$emit('refreshDrugs')
            } else if (res[0].status === 4) {
              this.$message('药品已退费~~')
              this.$emit('refreshDrugs')
            } else if (res[0].status === 5) {
              this.$message('不知道咋滴了，反正就是失败了~~')
              this.$emit('refreshDrugs')
            }
          })
          .catch(res => {
            this.$emit('refreshDrugs')
          })
      }
      this.btnLoading = false

      this.form.drug = ''
      this.$emit('refreshDrugs')
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
.pharmacyDrug-dialog {
  .el-cascader {
    width: 100%;
  }
}
</style>
