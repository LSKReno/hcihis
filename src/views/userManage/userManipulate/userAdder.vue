<template>
  <div class="user-dialog">
    <el-dialog
      id="addUserDialog"
      :title="title"
      :visible="dialogFormVisible"
      :show-close="false"
      width="45%"
    >
      <el-form :model="form">
        <el-form-item label="账户*">
          <el-input v-model="form.account" auto-complete="off" placeholder="此处填写账户"></el-input>
        </el-form-item>
        <el-form-item label="密码*">
          <el-input v-model="form.password" auto-complete="off" placeholder="此处填写密码"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名*">
          <el-input v-model="form.realName" placeholder="此处填写真实姓名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户科室*">
          <el-input v-model="form.userDepartment" placeholder="此处填写用户科室" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型*">
          <el-input v-model="form.userType" placeholder="此处填写用户类型" auto-complete="off"></el-input>
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
import { addUser as addUserApi } from '../../../api/user'

export default {
    name: 'UserAdder',
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
                account: '',
                password: '',
                realName: '',
                userDepartment: '',
                userType: ''
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
            if (this.form.account === '') {
                this.$message('账户不可以为空喔~~')
            } else if (this.form.password === '') {
                this.$message('密码不可以为空喔~~')
            } else if (this.form.realName === '') {
                this.$message('真实姓名不可以为空喔~~')
            } else if (this.form.userDepartment === '') {
                this.$message('用户科室不可以为空喔~~')
            } else if (this.form.userType === '') {
                this.$message('用户类型不可以为空喔~~')
            } else if (
                this.form.account !== '' &&
                this.form.password !== '' &&
                this.form.realName !== '' &&
                this.form.userDepartment !== '' &&
                this.form.userType !== ''
            ) {
                this.btnLoading = true
                addUserApi({
                    account: this.form.account,
                    password: this.form.password,
                    realName: this.form.realName,
                    userDepartment: this.form.userDepartment,
                    userType: this.form.userType
                })
                    .then(res => {
                        console.log('添加用户成功')
                        this.$message('您填写的用户添加成功了喔~~')
                        this.$emit('refreshUsers')
                    })
                    .catch(res => {
                        // console.log("没有拿到半句");
                        // this.$message("~~~有地方出问题啦");
                        this.$emit('refreshUsers')
                    })
            }
            this.btnLoading = false
            this.form.account = ''
            this.form.password = ''
            this.form.realName = ''
            this.form.userDepartment = ''
            this.form.userType = ''
            this.$emit('refreshUsers')
        }
    },
    components: {}
}
</script>
<style lang="scss">
.user-dialog {
    .el-cascader {
        width: 100%;
    }
}
</style>
