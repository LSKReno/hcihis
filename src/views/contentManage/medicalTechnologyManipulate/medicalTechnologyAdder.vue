<template>
  <div class="medicalTechnology-dialog">
    <el-dialog
      id="addMedicalTechnologyDialog"
      :title="title"
      :visible="dialogFormVisible"
      :show-close="false"
      width="45%"
    >
      <el-form :model="form">
        <el-form-item label="医技编码*">
          <el-input v-model="form.medicalTechnologyID" placeholder="此处填写医技编码"></el-input>
        </el-form-item>
        <el-form-item label="医技名称*">
          <el-input v-model="form.medicalTechnologyName" placeholder="此处填写医技名称"></el-input>
        </el-form-item>
        <el-form-item label="医技规格*">
          <el-input v-model="form.medicalTechnologySpecifications" placeholder="此处填写医技规格"></el-input>
        </el-form-item>
        <el-form-item label="所属类别*">
          <el-input v-model="form.category" placeholder="此处填写所属类别"></el-input>
        </el-form-item>
        <el-form-item label="辅疗科室*">
          <el-input v-model="form.department" placeholder="此处填写辅疗科室"></el-input>
        </el-form-item>
        <el-form-item label="项目费用*">
          <el-input v-model="form.fee" placeholder="此处填写项目费用"></el-input>
        </el-form-item>
        <el-form-item label="拼音助记码*">
          <el-input v-model="form.pinyinMnemonic" placeholder="此处填写拼音助记码"></el-input>
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
export default {
  name: 'MedicalTechnologyAdder',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
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
      form: {
        medicalTechnologyID: '',
        medicalTechnologyName: '',
        medicalTechnologySpecifications: '',
        category: '',
        department: '',
        fee: '',
        pinyinMnemonic: ''
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
      if (this.form.medicalTechnologyID === '') {
        this.$message('医技编码不可以为空喔~~')
      } else if (this.form.medicalTechnologyName === '') {
        this.$message('医技名称不可以为空喔~~')
      } else if (this.form.medicalTechnologySpecifications === '') {
        this.$message('医技规格不可以为空喔~~')
      } else if (this.form.category === '') {
        this.$message('所属类目不可以为空喔~~')
      } else if (this.form.department === '') {
        this.$message('辅疗科室不可以为空喔~~')
      } else if (this.form.fee === '') {
        this.$message('治疗费用不可以为空喔~~')
      } else if (this.form.pinyinMnemonic === '') {
        this.$message('拼音助记码不可以为空喔~~')
      } else if (
        this.form.medicalTechnologyID !== '' &&
        this.form.medicalTechnologyName !== '' &&
        this.form.medicalTechnologySpecifications !== '' &&
        this.form.category !== '' &&
        this.form.department !== '' &&
        this.form.fee !== '' &&
        this.form.pinyinMnemonic !== ''
      ) {
        this.btnLoading = true
        this.$message('您填写的医技添加成功了喔~~')
        this.$emit('addMedicalTechnology', {
          medicalTechnologyID: this.form.medicalTechnologyID,
          medicalTechnologyName: this.form.medicalTechnologyName,
          medicalTechnologySpecifications: this.form
            .medicalTechnologySpecifications,
          category: this.form.category,
          department: this.form.department,
          fee: this.form.fee,
          pinyinMnemonic: this.form.pinyinMnemonic,
          deleted: 0
        })
        this.btnLoading = false
        this.form = {
          id: null,
          medicalTechnologyID: '',
          medicalTechnologyName: '',
          medicalTechnologySpecifications: '',
          category: '',
          department: '',
          fee: '',
          pinyinMnemonic: ''
        }
      }
    }
  },
  components: {}
}
</script>
<style lang="scss">
.medicalTechnology-dialog {
  .el-cascader {
    width: 100%;
  }
}
</style>
