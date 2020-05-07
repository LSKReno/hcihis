<template>
  <div class="prescriptionTemplate-dialog">
    <el-form :inline="true" :model="form">
      <el-form-item label="真实姓名*">
        <el-input v-model="form.realName" size="small" auto-complete="off" placeholder="此处填写真实姓名"></el-input>
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
        >添加处方模板</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import HelpHint from '@/components/HelpHint.vue'
import {
  addPrescriptionTemplate as addPrescriptionTemplateApi
} from '../../../api/prescriptionTemplate'

export default {
  name: 'PrescriptionTemplateAdder',
  props: {
    dialogFormVisible: Boolean,
    title: {
      type: String,
      default: ''
    }
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
      prescriptionTemplateStaffOptions: [],
      form: {
        id: null,
        realName: '',
        gender: '',
        identityNumber: '',
        dateOfBirth: '',
        age: ''
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
        age: ''
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
      if (this.form.realName === '') {
        this.$message('真实姓名不可以为空喔~~')
      } else if (this.form.gender === '') {
        this.$message('性别不可以为空喔~~')
      } else if (this.form.identityNumber === '') {
        this.$message('身份证号不可以为空喔~~')
      } else if (this.form.dateOfBirth === '') {
        this.$message('出生日期不可以为空喔~~')
      } else if (
        this.form.realName !== '' &&
        this.form.gender !== '' &&
        this.form.identityNumber !== '' &&
        this.form.dateOfBirth !== '' &&
        this.form.paymentMethod !== ''
      ) {
        console.log('处方模板调试')
        console.log(this.form.selectedDepartment)
        console.log(this.form.selectedDoctorID)
        this.btnLoading = true
        addPrescriptionTemplateApi({
          realName: this.form.realName,
          gender: this.form.gender,
          identityNumber: this.form.identityNumber
        })
          .then(res => {
            if (res[0].status === 200) {
              console.log('添加处方模板成功')
              this.$message('您填写的处方模板添加成功了喔~~')
              this.$emit('refreshPrescriptionTemplates')
            } else if (res[0].status === 1) {
              this.$message('今日该医生处方模板数已超过处方模板限额~~')
            }
          })
          .catch(res => {
            this.$emit('refreshPrescriptionTemplates')
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
        prescriptionTemplateNoon: '',
        prescriptionTemplateStaff: '',
        buyMedicalRecord: ''
      }
      this.$emit('refreshPrescriptionTemplates')
    },
    getDepartmentOptionsList () {},
    remoteFindPatient (department, registeredLevel) {},
    remoteFindDoctor (department, registeredLevel) {},
    remoteFindPrescriptionTemplateStaff () {}
  },
  mounted () {},
  components: {
    HelpHint
  }
}
</script>
<style lang="scss">
.prescriptionTemplate-dialog {
  .el-cascader {
    width: 100%;
  }
}
</style>
