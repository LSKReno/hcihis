<template>
  <div>
    <ToolBar>
      <registrationAdder
        :title="registrationAdderTitle"
        @cancel="dialogFormVisible = false"
        @refreshRegistrations="refreshRegistration"
      ></registrationAdder>

      <div style="float: left">
        <el-input
          placeholder="搜索挂号ID"
          size="small"
          style="width: 150px"
          v-model="searchParams.registeredID"
          @input="searchRegistration"
          @clear="searchRegistration"
          clearable
        ></el-input>
        <el-button
          style="background-color: rgb(210, 235, 230);margin-left:10px;opacity:0.99"
          icon="el-icon-search"
          size="small"
          round
          @click="searchRegistration"
        ></el-button>
      </div>
    </ToolBar>

    <div class="animated fadeInUp">
      <el-table
        :data="tableDataRegistrations"
        border
        ref="table"
        height="455px"
        style="width: 100%;"
      >
        <!-- <el-table-column prop="id" fixed label="id" width="70" sortable></el-table-column> -->
        <el-table-column prop="registeredID" fixed label="挂号ID" width="155" sortable></el-table-column>
        <el-table-column prop="medicalRecordID" label="病历ID" width="140"></el-table-column>
        <el-table-column prop="realName" label="真实姓名" width="120" sortable></el-table-column>
        <el-table-column prop="gender" label="性别" width="50"></el-table-column>
        <el-table-column prop="identityNumber" label="身份证号" width="120" sortable></el-table-column>
        <el-table-column prop="dateOfBirth" label="出生日期" width="180" sortable></el-table-column>
        <el-table-column prop="age" label="年龄" width="80" sortable></el-table-column>
        <el-table-column prop="paymentMethod" label="支付方式" width="100"></el-table-column>
        <el-table-column prop="homeAddress" label="家庭住址" width="150"></el-table-column>
        <el-table-column prop="registeredDepartment" label="挂号科室" width="100"></el-table-column>
        <el-table-column prop="registeredLevel" label="挂号级别" width="100"></el-table-column>
        <el-table-column prop="vistingDoctorID" label="挂号医生ID" width="130"></el-table-column>
        <el-table-column prop="registrationDate" label="挂号日期" width="130" sortable></el-table-column>
        <el-table-column prop="registrationNoon" label="挂号午别" width="100"></el-table-column>
        <el-table-column prop="registrationStaff" label="挂号员ID" width="130"></el-table-column>
        <el-table-column
          prop="visitingStatus"
          label="看诊状态"
          width="80"
          fixed="right"
        >
          <div slot-scope="scope" style="width: 100%;text-align: center">
            <el-tag v-if="!scope.row.visitingStatus" type="success" size="small">未看诊</el-tag>
            <el-tag v-else type="danger" size="small">已看诊</el-tag>
          </div>
        </el-table-column>
        <el-table-column
          prop="buyMedicalRecord"
          label="是否购买病历"
          width="130"
        >
          <div slot-scope="scope" style="width: 100%;text-align: center">
            <el-tag v-if="scope.row.buyMedicalRecord" type="success" size="small">购买</el-tag>
            <el-tag v-else type="danger" size="small">不购买</el-tag>
          </div>
        </el-table-column>
        <el-table-column prop="amountReceivable" label="收费金额" width="80" size="small"></el-table-column>
        <el-table-column prop="invoiceID" label="发票ID" width="150" size="small"></el-table-column>
        <el-table-column
          prop="registeredStatus"
          label="挂号状态"
          width="80"
          fixed="right"
        >
          <div slot-scope="scope" style="width: 100%;text-align: center">
            <el-tag v-if="scope.row.registeredStatus" type="success" size="small">已挂号</el-tag>
            <el-tag v-else type="danger" size="small">已退号</el-tag>
          </div>
        </el-table-column>
        <el-table-column prop="deleteTag" label="删除标记" width="80" >
          <div slot-scope="scope" style="width: 100%;text-align: center">
            <el-tag v-if="scope.row.deleteTag" type="success" size="small">正常状态</el-tag>
            <el-tag v-else type="danger" size="small">删除状态</el-tag>
          </div>
        </el-table-column>

        <el-table-column label="操作" fixed="right" :render-header="tableAction" width="140">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="info"
              icon="el-icon-info"
              size="small"
              circle
            ></el-button>
            <el-button
              @click="updateRegistration(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
            ></el-button>
            <el-button
              @click="deleteRegistration(scope.row)"
              type="danger"
              icon="el-icon-delete"
              size="small"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div align="center">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue'
import HelpHint from '@/components/HelpHint.vue'
import { registrationsTotal as registrationsTotalApi, allRegistration as registrationApi, deleteRegistration as deleteRegistrationApi } from '../../api/registration'

import registrationAdder from './registrationManipulate/registrationAdder.vue'
import registrationUpdatter from './registrationManipulate/registrationUpdatter.vue'

export default {
    data () {
        return {
            form: {
                id: null,
                realName: '',
                gender: '',
                identityNumber: '',
                dateOfBirth: '',
                age: '',
                paymentMethod: '',
                homeAddress: '',
                selectedDepartment: '',
                registeredLevel: '',
                selectedDoctorID: '',
                registrationNoon: '',
                registrationStaff: '',
                buyMedicalRecord: ''
            },
            registrationAdderTitle: '挂号编写',
            dialogFormVisible: false,
            dialogFormVisiblePatientPay: false,
            patientPayTitle: '患者缴费',
            patientPayEditChange: '',
            registrationUpdatterTitle: '挂号更新',
            registrationUpdatter: false,
            currentEditRegistration: [],
            searchParams: {
                registeredID: ''
            },
            tableDataRegistrations: [],
            pageSize: 50,
            currentPage: 1,
            pageNum: 1,
            total: 0
        }
    },
    methods: {
        searchRegistration () {
            const tableRow = this.$refs.table.$el.querySelectorAll('tbody tr')
            const tableRowHeight = tableRow[1].offsetHeight
            let isjump = false
            for (let i = 0; i < this.tableDataRegistrations.length; i++) {
                if (
                    this.searchParams.registeredID &&
                    this.tableDataRegistrations[i].registeredID.indexOf(
                        this.searchParams.registeredID
                    ) !== -1
                ) {
                    tableRow[i].style.backgroundColor = '#99CCCC'
                    if (!isjump) {
                        scrollTo(0, i * tableRowHeight + 66)
                        isjump = true
                    }
                } else {
                    tableRow[i].style.backgroundColor = '#fff'
                }
            }
        },
        // 条目改变时
        handleCurrentChange (val) {
            this.pageNum = val
            this.refreshRegistration()
        },
        addRegistration () {
            const self = this
            self.dialogFormVisible = true
        },
        patientPay () {
            const self = this
            self.dialogFormVisiblePatientPay = true
        },
        handleClick (row) {
            this.$alert(row, '挂号', {
                confirmButtonText: '确定',
                callback: action => {},
                roundButton: true
            })
        },
        tableAction () {
            return this.$createElement(
                'HelpHint',
                {
                    props: {
                        content: '查看挂号 / 编辑挂号 / 退号 '
                    }
                },
                '操作'
            )
        },

        deleteRegistration (row) {
            const self = this
            self.$confirm('此操作将进行退号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                roundButton: true
            })
                .then(() => {
                    deleteRegistrationApi({
                        id: row.id
                    })
                        .then(res => {
                            if (res[0].status === 200) {
                                self.$notify({
                                    title: '成功',
                                    message:
                                        '挂号名称为 ' +
                                        row.realName +
                                        ' 的挂号成功退号',
                                    type: 'success',
                                    offset: 60
                                })
                                self.refreshRegistration()
                            } else if (res[0].status === 1) {
                                this.$message(
                                    '挂号名为 ' +
                                        row.realName +
                                        ' 的顾客您要退的号已经看诊, 无法退号喔~~'
                                )
                            } else if (res[0].status === 2) {
                                this.$message(
                                    '您要退的号已经退过了喔~~ 不可二次退号喔~~ 请刷新试试看吧'
                                )
                            }
                        })
                        .catch(res => {
                            console.log('没有成功退号')
                        })
                })
                .catch(() => {})
        },

        refreshRegistration () {
            registrationApi({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            })
                .then(res => {
                    // console.log("得到所有挂号res");
                    // console.log(res);
                    this.tableDataRegistrations = res
                })
                .catch(res => {
                    console.log('没有拿到挂号')
                })
            this.getRegistrationsTotal()
            this.dialogFormVisible = false
        },
        getRegistrationsTotal () {
            registrationsTotalApi({})
                .then(res => {
                    // console.log("得到所有挂号数量res");
                    // console.log(res);
                    // console.log(res[0].registrationFormsTotal);
                    this.total = res[0].registrationFormsTotal
                })
                .catch(res => {
                    console.log('没有拿到挂号数量')
                })
        }
    },

    created () {
        this.refreshRegistration()
    },

    components: {
        ToolBar,
        HelpHint,
        registrationAdder,
        registrationUpdatter
    }
}
</script>
