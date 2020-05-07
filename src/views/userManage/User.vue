<template>
  <div class="user-list">
    <ToolBar>
      <div class="animated bounceInRight">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          round
          @click="addUser"
        >添加 用户</el-button>
      </div>
      <div class="animated bounceInLeft">
        <span
          v-for="(userType,index) in userTypeList"
          @click="clickUserType(index,userType)"
          :class="{'spanActive':currentUserType===index}"
          :key="index"
        >
          <el-button size="small" round>{{ userType }}</el-button>&nbsp;
          <!-- <el-button v-if="userType==3" size="small" round>医生</el-button>&nbsp;
                    <el-button v-elif="userType==2" size="small" round>挂号收费员</el-button>&nbsp;
                    <el-button v-elif="userType==1" size="small" round>医院管理员</el-button>&nbsp;
                    <el-button v-elif="userType==0" size="small" round>处置医技医生</el-button>&nbsp;-->
        </span>
      </div>

      <div style="float: right">
        <el-input
          placeholder="请输入用户真实姓名！"
          size="small"
          style="width: 140px"
          v-model="params.name"
          @clear="searchUser"
          clearable
        ></el-input>
        <el-button
          @click="searchUser"
          type="success"
          icon="el-icon-search"
          round
          size="small"
        ></el-button>
      </div>
      <userAdder
        :title="userAdderTitle"
        :dialogFormVisible="dialogFormVisible"
        @val-change="userEditChange"
        @cancel="dialogFormVisible = false"
        @refreshSentences="refreshUser"
      ></userAdder>
      <userUpdatter
        :title="userUpdatterTitle"
        :dialogFormVisible="userUpdatter"
        :data="currentEditUser"
        @val-change="userEditChange"
        @cancel="userUpdatter = false"
        @refreshSentences="refreshUser"
      ></userUpdatter>
    </ToolBar>

    <el-table :data="tableDataUsers" border ref="table" height="450px" style="width: 100%">
      <el-table-column prop="id" label="id" width="70"></el-table-column>
      <el-table-column prop="userID" label="用户ID" width="150"></el-table-column>
      <el-table-column prop="realName" label="真实姓名" width="100"></el-table-column>
      <el-table-column prop="userDepartment" label="用户部门"></el-table-column>
      <el-table-column prop="userType" label="用户类型"></el-table-column>
      <el-table-column prop="deleteTag" label="删除标记" width="100">
        <div slot-scope="scope" style="width: 100%;text-align: center">
          <el-tag v-if="scope.row.deleteTag" type="success" size="small">正常状态</el-tag>
          <el-tag v-else type="danger" size="small">删除状态</el-tag>
        </div>
      </el-table-column>

      <el-table-column label="操作" :render-header="tableAction" width="140">
        <template slot-scope="scope">
          <el-button
            @click="resetting(scope.row.id)"
            type="warning"
            style="transition: .4s;"
            :ref="scope.row.id"
            icon="el-icon-refresh"
            size="small"
            circle
          ></el-button>
          <el-button
            @click="editUser(scope.row)"
            type="primary"
            icon="el-icon-edit"
            size="small"
            circle
          ></el-button>
          <el-button
            @click="deleteUser(scope.row)"
            v-if="scope.row.deleteTag != 0 "
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
          ></el-button>
          <el-button
            @click="deleteUser(scope.row)"
            v-else
            icon="el-icon-check"
            circle
            size="small"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue'
import HelpHint from '@/components/HelpHint.vue'
import { allUser as usersApi, deleteUser as deleteUserApi, userType as userTypeApi } from '../../api/user'

import userAdder from './userManipulate/userAdder.vue'
import userUpdatter from './userManipulate/userUpdatter.vue'
import { unique as uniqueArray } from '../../utils/commonUtils'

export default {
    data () {
        return {
            currentUserType: 0,
            userTypeList: [],

            userAdderTitle: '用户编写',
            dialogFormVisible: false,
            userUpdatterTitle: '用户更新',
            userUpdatter: false,
            currentEditUser: [],
            params: {
                name: ''
            },
            tableDataUsers: []
        }
    },
    methods: {
        searchUser () {
            const tableRow = this.$refs.table.$el.querySelectorAll('tbody tr')
            const tableRowHeight = tableRow[1].offsetHeight
            let isjump = false
            for (let i = 0; i < this.tableDataUsers.length; i++) {
                if (
                    this.params.name &&
                    this.tableDataUsers[i].realName.indexOf(this.params.name) !==
                        -1
                ) {
                    tableRow[i].style.backgroundColor = '#85ce61'
                    if (!isjump) {
                        scrollTo(0, i * tableRowHeight + 66)
                        isjump = true
                    }
                } else {
                    tableRow[i].style.backgroundColor = '#fff'
                }
            }
        },
        tableAction () {
            return this.$createElement(
                'HelpHint',
                {
                    props: {
                        content: '重置密码为123456 / 编辑用户 / 删除或恢复用户'
                    }
                },
                '操作'
            )
        },
        clickUserType (index, userType) {
            this.currentUserType = index
            console.log(userType)
            console.log(this.currentUserType)
            userTypeApi({
                userType: this.userTypeList[this.currentUserType]
            })
                .then(res => {
                    console.log(
                        '得到 ' +
                            this.userTypeList[this.currentUserType] +
                            ' 的用户类型res'
                    )
                    console.log(res)
                    this.tableDataUsers = res
                })
                .catch(res => {
                    console.log('没有拿到用户类型')
                })
        },
        addUser () {
            const self = this
            self.dialogFormVisible = true
        },
        UploadUser (data) {},
        deleteUser (row) {
            const self = this
            self.$confirm('此操作将删除/恢复该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                roundButton: true
            })
                .then(() => {
                    deleteUserApi({
                        id: row.id
                    })
                        .then(res => {
                            self.$notify({
                                title: '成功',
                                message:
                                    '用户名称为 ' +
                                    row.realName +
                                    ' 的用户删除/恢复成功',
                                type: 'success',
                                offset: 60
                            })
                            self.refreshUser()
                        })
                        .catch(res => {
                            console.log('没有删除/恢复该用户')
                        })
                })
                .catch(() => {})
        },
        resetting (id) {
            const dom = this.$refs[id].$el
            dom.style.transform = 'rotate(180deg)'
            setTimeout(() => {
                dom.style.transform = 'rotate(0deg)'
            }, 600)
            this.$message({
                message: '已经成功重置密码',
                type: 'success'
            })
        },
        refreshUser () {
            usersApi({})
                .then(res => {
                    console.log('得到所有用户res')
                    console.log(res)
                    this.tableDataUsers = res
                })
                .catch(res => {
                    console.log('没有拿到用户')
                })
            this.dialogFormVisible = false
        },
        getAllUserType (theme) {
            userTypeApi({
                userType: ''
            })
                .then(res => {
                    console.log('得到所有用户类型res')

                    for (const index in res) {
                        if (res[index].userType) { this.userTypeList.push(res[index].userType) }
                    }
                    this.userTypeList = uniqueArray(this.userTypeList)
                })
                .catch(res => {
                    console.log('没有拿到用户类型')
                })
        }
    },
    created () {
        this.getAllUserType()
        this.refreshUser()
    },
    components: {
        ToolBar,
        HelpHint,
        userAdder,
        userUpdatter
    }
}
</script>
<style lang="scss">
</style>
