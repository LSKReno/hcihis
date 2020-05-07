<template>
  <div class="cancelRegistration-dialog">
    <div style="text-align:center;position:fixed;z-index:0">
      <img src="https://i.loli.net/2019/09/17/kHiaJGT4lA28tWD.jpg" style="width:40%;opacity:0.4" />
    </div>
    <el-form :inline="true" :model="form" style="opacity:0.99">
      <div style="font-size:15px;font-weight:300;">患者信息查询</div>
      <el-form-item label="病历号*">
        <el-input size="small" v-model="form.medicalRecordID" @input="btnOk" placeholder="此处填写病历号"></el-input>
      </el-form-item>
      <el-form-item>
                &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button round size="small" class="animated bounceInLeft" @click="reset">重 置</el-button>&nbsp;
        <!-- <el-button round size="small" class="animated bounceInRight" type="primary" :loading="btnLoading" @click="btnOk">确 定</el-button> -->
      </el-form-item>
      <div style="font-size:15px;font-weight:300;">患者信息确认</div>
      <el-form-item label="患者姓名">
        <el-input size="small" v-model="realName" disabled placeholder="患者姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input size="small" v-model="identityNumber" disabled placeholder="身份证号"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input size="small" v-model="homeAddress" disabled placeholder="家庭住址"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { addCancelRegistration } from '../../../api/cancelRegistration'

export default {
  name: 'CancelRegistrationAdder',
  props: {
    dialogFormVisible: Boolean,
    title: String,
    realName: String,
    identityNumber: String,
    homeAddress: String

  },
  data () {
    return {
      props: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      form: {
        medicalRecordID: '',
        realName: '',
        identityNumber: '',
        homeAddress: ''
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
        medicalRecordID: ''
      }
      this.$emit('searchRegistrationByMedicalRecordID', this.form.medicalRecordID)
    },
    btnOk () {
      this.$emit('searchRegistrationByMedicalRecordID', this.form.medicalRecordID)
    }

  },
  components: {}
}
</script>
<style lang="scss">
.cancelRegistration-dialog {
  .el-cascader {
    width: 100%;
  }
}
</style>
