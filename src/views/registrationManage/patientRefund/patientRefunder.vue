<template>
  <div class="patientRefund-dialog">
    <el-dialog
      id="patientRefundDialog"
      :title="title"
      :visible="dialogFormVisible"
      :show-close="false"
      width="50%"
    >
      <el-form :inline="true" :model="form">
        <el-form-item label="处方ID*">
          <el-input v-model="form.prescriptionID" auto-complete="off" placeholder="此处填写处方ID"></el-input>
        </el-form-item>
        <el-form-item label="药品ID*">
          <el-input v-model="form.drugID" auto-complete="off" placeholder="此处填写药品ID"></el-input>
        </el-form-item>
        <el-form-item label="发票ID*">
          <el-input v-model="form.invoiceID" auto-complete="off" placeholder="此处填写发票ID"></el-input>
        </el-form-item>
        <!-- <el-form-item label="操作员ID*">
                    <el-input
                        v-model="form.operatorStaffID"
                        placeholder="此处填写操作员ID"
                        auto-complete="off"
                    ></el-input>
                </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="$emit('cancel');">取 消</el-button>
        <el-button round type="primary" :loading="btnLoading" @click="btnOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { patientRefund as patientRefundApi } from '../../../api/content'

export default {
    name: 'PatientRefunder',
    props: {
        dialogFormVisible: Boolean,
        // data: [Object, Boolean],
        title: String
        // departTree: Array
    },
    data () {
        return {
            props: {
                value: 'id',
                label: 'name',
                children: 'children'
            },
            form: {
                id: null,
                prescriptionID: '',
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
        btnOk () {
            if (this.form.prescriptionID === '') {
                this.$message('处方ID不可以为空喔~~')
            } else if (this.form.drugID === '') {
                this.$message('药品ID不可以为空喔~~')
            } else if (this.form.invoiceID === '') {
                this.$message('发票ID不可以为空喔~~')
            } else if (this.form.operatorStaffID === '') {
                this.$message('操作员ID不可以为空喔~~')
            } else if (
                this.form.prescriptionID !== '' &&
                this.form.drugID !== '' &&
                this.form.invoiceID !== '' &&
                this.form.operatorStaffID !== ''
            ) {
                this.btnLoading = true
                patientRefundApi({
                    prescriptionID: this.form.prescriptionID,
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
                            this.$message('未查询到此处方ID~~')
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
                    .catch(res => {
                        this.$emit('refreshCancelRegistrations')
                    })
            }
            this.btnLoading = false

            this.form = {
                id: null,
                prescriptionID: '',
                drugID: '',
                invoiceID: '',
                operatorStaffID: ''
            }
            this.$emit('refreshCancelRegistrations')
        }
    },
    mounted: {},
    components: {}
}
</script>
<style lang="scss">
.patientRefund-dialog {
    .el-cascader {
        width: 100%;
    }
}
</style>
