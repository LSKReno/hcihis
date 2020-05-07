<template>
  <div class="registration-dialog">
    <div style="text-align:center;position:fixed;z-index:0">
      <img src="https://i.loli.net/2019/09/06/NS7rMvRkToB3JLn.png" style="width:40%;opacity:0.4" />
    </div>
    <el-form :inline="true" :model="form" style="opacity:0.99">
      <el-form-item label="真实姓名*">
        <el-input
          v-model="form.realName"
          size="small"
          auto-complete="off"
          placeholder="此处填写真实姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别*">
        <el-select v-model="form.gender" size="small" clearable placeholder="请选择性别*">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-tooltip class="item" effect="dark" content="输入身份证号后, 点击空白处, 可以自动填写患者信息喔">
        <el-form-item label="身份证号*">
          <el-input
            v-model="form.identityNumber"
            size="small"
            placeholder="此处填写身份证号"
            auto-complete="off"
            @blur="remoteFindPatient"
          ></el-input>
        </el-form-item>
      </el-tooltip>
      <el-form-item label="出生日期*">
        <div class="block">
          <el-date-picker
            v-model="form.dateOfBirth"
            size="small"
            :change="calculateAge()"
            type="datetime"
            placeholder="选择日期时间"
            default-time="22:22:22"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="form.age" size="small" placeholder="此处填写年龄" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="支付方式*">
        <el-select
          v-model="form.paymentMethod"
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
      <el-form-item label="家庭地址*">
        <el-input
          v-model="form.homeAddress"
          size="small"
          placeholder="此处填写家庭地址"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="挂号科室*">
        <el-select
          v-model="form.selectedDepartment"
          size="small"
          filterable
          clearable
          @change="resetDoctor"
          @clear="resetDoctor"
          placeholder="请选择挂号科室"
        >
          <el-option
            v-for="item in options"
            :key="item.departmentID"
            :label="item.departmentName"
            :value="item.departmentID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="挂号级别*">
        <el-select
          v-model="form.registeredLevel"
          size="small"
          clearable
          @change="resetDoctor"
          @clear="resetDoctor"
          placeholder="请选择挂号级别*"
        >
          <el-option label="专家号" value="zjh"></el-option>
          <el-option label="普通号" value="pth"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="看诊午别*">
        <el-select
          v-model="form.registrationNoon"
          size="small"
          clearable
          placeholder="此处填写看诊午别*"
        >
          <el-option label="上午" value="上午"></el-option>
          <el-option label="下午" value="下午"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="看诊医生*">
        <el-select
          v-model="form.selectedDoctorID"
          size="small"
          clearable
          @visible-change="remoteFindDoctor(form.selectedDepartment,form.registeredLevel)"
          placeholder="请选择看诊医生"
        >
          <el-option
            v-for="item in doctorOptions"
            :key="item.doctorID"
            :label="item.doctorName"
            :value="item.doctorID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="挂号员ID*">
        <el-select
          v-model="form.registrationStaff"
          size="small"
          clearable
          placeholder="请选择挂号员"
        >
          <el-option
            v-for="item in registrationStaffOptions"
            :key="item.registrationStaffID"
            :label="item.registrationStaffName"
            :value="item.registrationStaffID"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否购买病历*">
        <el-select
          v-model="form.buyMedicalRecord"
          size="small"
          clearable
          placeholder="此处填写是否购买病历*"
        >
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="应付挂号费">
        <div style="width: 100%;text-align: center;">
          <el-tag
            v-if="form.registeredLevel=='zjh'&&form.buyMedicalRecord=='1' "
            style="background-color:rgb(218, 235, 235);color:#339999"
            size="medium"
          >51</el-tag>
          <el-tag
            v-if="form.registeredLevel=='zjh'&&form.buyMedicalRecord=='0' "
            style="background-color:rgb(218, 235, 235);color:#339999"
            size="medium"
          >50</el-tag>
          <el-tag
            v-if="form.registeredLevel=='pth'&&form.buyMedicalRecord=='1' "
            style="background-color:rgb(218, 235, 235);color:#339999"
            size="medium"
          >9</el-tag>
          <el-tag
            v-if="form.registeredLevel=='pth'&&form.buyMedicalRecord=='0' "
            style="background-color:rgb(218, 235, 235);color:#339999"
            size="medium"
          >8</el-tag>
        </div>
      </el-form-item>
      <el-form-item>
                &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button round size="small" class="animated bounceInLeft" @click="reset">重 置</el-button>&nbsp;
        <el-button
          round
          size="small"
          icon="el-icon-plus"
          class="animated bounceInRight"
          type="primary"
          :loading="btnLoading"
          @click="btnOk"
        >添加挂号</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import HelpHint from '@/components/HelpHint.vue'
import { addRegistration as addRegistrationApi, remoteFindPatient as remoteFindPatientOptionsApi } from '../../../api/registration'
import { getDepartmentOptions as getDepartmentOptionsApi } from '../../../api/department'

import { remoteFindDoctorOptions as remoteFindDoctorOptionsApi } from '../../../api/doctor'
import { remoteFindRegistrationStaff as remoteFindRegistrationStaffOptionsApi } from '../../../api/user'

export default {
    name: 'RegistrationAdder',
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
            options: [],
            doctorOptions: [],
            registrationStaffOptions: [],
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
            btnLoading: false
        }
    },
    watch: {
        // data: {
        //     handler: function() {}
        // }
    },
    methods: {
        reset () {
            this.form = {
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
            }
        },
        calculateAge () {
            function getCurrentYear () {
                var date = new Date()
                // 年
                var year = date.getFullYear()
                return year
            }
            var birth = this.moment(this.form.dateOfBirth).format('YYYY')
            this.form.age = parseInt(getCurrentYear()) - parseInt(birth)
            // console.log(this.form.age);
        },
        resetDoctor () {
            this.doctorOptions = []
            this.form.selectedDoctorID = ''
        },
        btnOk () {
            // 显示日期在页面上  yyy-MM-dd
            function getCurrentDate () {
                var date = new Date()
                // 年
                var year = date.getFullYear()
                // 月
                var month = date.getMonth() + 1
                // 日
                var day = date.getDate()
                // 时
                var hh = date.getHours()
                // 分
                var mm = date.getMinutes()
                // 秒
                var ss = date.getSeconds()

                if (month >= 1 && month <= 9) {
                    month = '0' + month
                }
                if (day >= 1 && day <= 9) {
                    day = '0' + day
                }
                if (hh >= 1 && hh <= 9) {
                    hh = '0' + hh
                }
                if (mm >= 1 && mm <= 9) {
                    mm = '0' + mm
                }
                if (ss >= 1 && ss <= 9) {
                    ss = '0' + ss
                }

                return (
                    year +
                    '-' +
                    month +
                    '-' +
                    day +
                    ' ' +
                    hh +
                    ':' +
                    mm +
                    ':' +
                    ss
                )
            }

            if (this.form.realName === '') {
                this.$message('真实姓名不可以为空喔~~')
            } else if (this.form.gender === '') {
                this.$message('性别不可以为空喔~~')
            } else if (this.form.identityNumber === '') {
                this.$message('身份证号不可以为空喔~~')
            } else if (this.form.dateOfBirth === '') {
                this.$message('出生日期不可以为空喔~~')
            } else if (this.form.paymentMethod === '') {
                this.$message('支付方式不可以为空喔~~')
            } else if (this.form.homeAddress === '') {
                this.$message('家庭住址不可以为空喔~~')
            } else if (this.form.selectedDepartment === '') {
                this.$message('挂号科室不可以为空喔~~')
            } else if (this.form.registeredLevel === '') {
                this.$message('挂号级别不可以为空喔~~')
            } else if (this.form.registrationNoon === '') {
                this.$message('看诊午别不可以为空喔~~')
            } else if (this.form.registrationStaff === '') {
                this.$message('挂号员ID不可以为空喔~~')
            } else if (this.form.buyMedicalRecord === '') {
                this.$message('是否购买病历不可以为空喔~~')
            } else if (this.form.selectedDoctorID === '') {
                this.$message('看诊医生ID不可以为空喔~~')
            } else if (this.form.age === '') {
                this.$message('年龄不可以为空喔~~')
            } else if (
                this.form.realName !== '' &&
                this.form.gender !== '' &&
                this.form.identityNumber !== '' &&
                this.form.dateOfBirth !== '' &&
                this.form.paymentMethod !== '' &&
                this.form.homeAddress !== '' &&
                this.form.selectedDepartment !== '' &&
                this.form.registeredLevel !== '' &&
                this.form.registrationNoon !== '' &&
                this.form.registrationStaff !== '' &&
                this.form.buyMedicalRecord !== '' &&
                this.form.amountReceivable !== '' &&
                this.form.selectedDoctorID !== '' &&
                this.form.age !== '' &&
                this.form.age !== 'NaN'
            ) {
                // console.log("挂号调试");
                // console.log(this.form.selectedDepartment);
                // console.log(this.form.selectedDoctorID);
                this.btnLoading = true
                addRegistrationApi({
                    realName: this.form.realName,
                    gender: this.form.gender,
                    identityNumber: this.form.identityNumber,
                    dateOfBirth: this.moment(this.form.dateOfBirth).format(
                        'YYYY-MM-DD HH:mm:ss'
                    ),
                    paymentMethod: this.form.paymentMethod,
                    homeAddress: this.form.homeAddress,
                    registeredDepartment: this.form.selectedDepartment,
                    registeredLevel: this.form.registeredLevel,
                    registrationNoon: this.form.registrationNoon,
                    registrationStaff: this.form.registrationStaff,
                    buyMedicalRecord: this.form.buyMedicalRecord,
                    age: this.form.age,
                    vistingDoctorID: this.form.selectedDoctorID,
                    registrationDate: getCurrentDate()
                })
                    .then(res => {
                        if (res[0].status === 200) {
                            console.log('添加挂号成功')
                            this.$message('您填写的挂号添加成功了喔~~')
                            this.$emit('refreshRegistrations')
                        } else if (res[0].status === 1) {
                            this.$message('今日该医生挂号数已超过挂号限额~~')
                        }
                    })
                    .catch(res => {
                        this.$emit('refreshRegistrations')
                    })
            }
            this.btnLoading = false
            this.form = {
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
            }
            this.$emit('refreshRegistrations')
        },
        getDepartmentOptionsList () {
            getDepartmentOptionsApi({})
                .then(res => {
                    // console.log(res);
                    this.options = res
                })
                .catch(res => {})
        },
        remoteFindPatient (department, registeredLevel) {
            remoteFindPatientOptionsApi({
                identityNumber: this.form.identityNumber
            })
                .then(res => {
                    // console.log(res);
                    if (res[0].status === 200) {
                        this.form.realName = res[0].patient.realName
                        this.form.dateOfBirth = res[0].patient.dateOfBirth
                        this.form.gender = res[0].patient.gender
                        this.form.homeAddress = res[0].patient.homeAddress
                    } else {
                        // this.form.realName = "";
                        // this.form.dateOfBirth = "";
                        // this.form.gender = "";
                        // this.form.homeAddress = "";
                        this.$message(
                            '此身份证号没有在我们系统挂过号喔~~我们将在后台为该患者生成一个终身唯一的病历号喔'
                        )
                    }
                })
                .catch(res => {})
        },
        remoteFindDoctor (department, registeredLevel) {
            remoteFindDoctorOptionsApi({
                department: department,
                registeredLevel: registeredLevel
            })
                .then(res => {
                    // console.log(res);
                    this.doctorOptions = res
                })
                .catch(res => {})
        },
        remoteFindRegistrationStaff () {
            remoteFindRegistrationStaffOptionsApi({})
                .then(res => {
                    // console.log(res);
                    this.registrationStaffOptions = res
                })
                .catch(res => {})
        }
    },
    mounted () {
        this.getDepartmentOptionsList()
        this.remoteFindRegistrationStaff()
    },
    components: {
        HelpHint
    }
}
</script>
<style lang="scss">
.registration-dialog {
    .el-cascader {
        width: 100%;
    }
}
</style>
