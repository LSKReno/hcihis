<template>
  <div class="patientPay-dialog">
    <el-dialog
      id="patientPayDialog"
      :title="title"
      :visible="dialogFormVisible"
      :show-close="false"
      width="50%"
    >
      <el-form :inline="true" :model="form">
        <el-form-item label="处方ID*">
          <el-input v-model="form.prescriptionID" auto-complete="off" placeholder="此处填写处方ID"></el-input>
        </el-form-item>
        <el-form-item label="操作员ID*">
          <el-input
            v-model="form.operatorStaffID"
            placeholder="此处填写操作员ID"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button round @click="$emit('cancel');">取 消</el-button>
        <el-button round type="primary" :loading="btnLoading" @click="btnOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { patientPay as patientPayApi } from '../../../api/content'

export default {
    name: 'PatientPayer',
    props: {
        dialogFormVisible: Boolean,
        title: String
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
        calculateAge () {
            function getCurrentYear () {
                var date = new Date()
                // 年
                var year = date.getFullYear()
                return year
            }
            var birth = this.moment(this.form.dateOfBirth).format('YYYY')
            this.form.age = parseInt(getCurrentYear()) - parseInt(birth)
            console.log(this.form.age)
        },
        btnOk () {
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
                    .catch(res => {
                        this.$emit('refreshRegistrations')
                    })
            }
            this.btnLoading = false

            this.form = {
                id: null,
                prescriptionID: '',
                operatorStaffID: ''
            }
            this.$emit('refreshRegistrations')
        }
    },
    mounted: {},
    components: {}
}
</script>
<style lang="scss">
.patientPay-dialog {
    .el-cascader {
        width: 100%;
    }
}
</style>
