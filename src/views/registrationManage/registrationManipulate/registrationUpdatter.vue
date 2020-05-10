<template>
  <div class="registration-dialog">
    <el-dialog
      id="addRegistrationDialog"
      :title="title"
      :visible="dialogFormVisible"
      :show-close="false"
      width="80%"
    >
      <el-form :inline="true" :model="form">
        <el-form-item label="真实姓名*">
          <el-input v-model="form.realName" auto-complete="off" placeholder="此处填写真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别*">
          <el-select v-model="form.gender" clearable placeholder="请选择性别*">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号*">
          <el-input v-model="form.identityNumber" placeholder="此处填写身份证号" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出生日期*">
          <div class="block">
            <el-date-picker
              v-model="form.dateOfBirth"
              :change="calculateAge()"
              type="datetime"
              placeholder="选择日期时间"
              default-time="22:22:22"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" placeholder="此处填写年龄" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付方式*">
          <el-select v-model="form.paymentMethod" clearable placeholder="请选择支付方式*">
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
          <el-input v-model="form.homeAddress" placeholder="此处填写家庭地址" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="挂号科室*">
          <el-select
            v-model="form.selectedDepartment"
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
            clearable
            @change="resetDoctor"
            @clear="resetDoctor"
            placeholder="请选择挂号级别*"
          >
            <el-option label="专家号" value="zjh"></el-option>
            <el-option label="普通号" value="pth"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="看诊医生*">
          <el-select
            v-model="form.selectedDoctorID"
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
        <el-form-item label="看诊午别*">
          <el-select v-model="form.registrationNoon" clearable placeholder="此处填写看诊午别*">
            <el-option label="上午" value="上午"></el-option>
            <el-option label="下午" value="下午"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="挂号员ID*">
          <el-input v-model="form.registrationStaff" placeholder="此处填写挂号员ID" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否购买病历*">
          <el-select v-model="form.buyMedicalRecord" clearable placeholder="此处填写是否购买病历*">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
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
import { addRegistration as addRegistrationApi } from '../../../api/registration'
import { getDepartmentOptions as getDepartmentOptionsApi } from '../../../api/department'
import { remoteFindDoctorOptions as remoteFindDoctorOptionsApi } from '../../../api/doctor'

export default {
  name: 'RegistrationAdder',
  props: {
    dialogFormVisible: Boolean,
    // data: [Object, Boolean],
    title: {
      type: String,
      default: ''
    }
    // departTree: Array
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
      departmentsList: [],
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

        return year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
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
        console.log('挂号调试')
        console.log(this.form.selectedDepartment)
        console.log(this.form.selectedDoctorID)
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
            // console.log("没有拿到半句");
            // this.$message("~~~有地方出问题啦");
            this.$emit('refreshRegistrations')
          })
      }
      this.btnLoading = false
      // realName: "",
      //     gender: "",
      //     identityNumber: "",
      //     dateOfBirth: "",
      //     age: "",
      //     paymentMethod: "",
      //     homeAddress: "",
      //     registeredDepartment: "",
      //     registeredLevel: "",
      //     vistingDoctorID: "",
      //     registrationNoon: "",
      //     registrationStaff: "",
      //     buyMedicalRecord: "",
      //     amountReceivable: ""
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
          console.log(res)
          this.options = res
        })
        .catch(res => {})
    },
    remoteFindDoctor (department, registeredLevel) {
      console.log(department)
      console.log(registeredLevel)

      remoteFindDoctorOptionsApi({
        department: department,
        registeredLevel: registeredLevel
      })
        .then(res => {
          console.log(res)
          this.doctorOptions = res
        })
        .catch(res => {})
      //     // setTimeout(() => {
      //     //     this.doctorOptions = this.list.filter(item => {
      //     //         return (
      //     //             item.label
      //     //                 .toLowerCase()
      //     //                 .indexOf(query.toLowerCase()) > -1
      //     //         );
      //     //     });
      //     // }, 200);
    }
  },
  mounted () {
    this.getDepartmentOptionsList()
  },
  components: {}
}
</script>
<style lang="scss">
.registration-dialog {
  .el-cascader {
    width: 100%;
  }
}
</style>
