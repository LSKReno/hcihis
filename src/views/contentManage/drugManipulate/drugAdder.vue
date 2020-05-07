<template>
  <div class="drug-dialog">
    <el-dialog
      id="addDrugDialog"
      :title="title"
      :visible="dialogFormVisible"
      :show-close="false"
      width="45%"
    >
      <el-form :model="form">
        <el-form-item label="药品编码*">
          <el-input v-model="form.drugCode" auto-complete="off" placeholder="此处填写药品编码"></el-input>
        </el-form-item>
        <el-form-item label="药品名称*">
          <el-input v-model="form.drugName" auto-complete="off" placeholder="此处填写药品名称"></el-input>
        </el-form-item>
        <el-form-item label="药品分类*">
          <el-input v-model="form.drugCategoryID" placeholder="此处填写药品分类" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="药品类型*">
          <el-input v-model="form.drugType" placeholder="此处填写药品类型" auto-complete="off"></el-input>
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
import { addDrug as addDrugApi } from '../../../api/drug'

export default {
  name: 'DrugAdder',
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
      form: {
        id: null,
        drugCode: '',
        drugName: '',
        drugCategoryID: '',
        drugType: ''
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
      if (this.form.drugCode === '') {
        this.$message('药品编码不可以为空喔~~')
      } else if (this.form.drugName === '') {
        this.$message('药品名称不可以为空喔~~')
      } else if (this.form.drugCategoryID === '') {
        this.$message('药品分类不可以为空喔~~')
      } else if (this.form.drugType === '') {
        this.$message('药品类型不可以为空喔~~')
      } else if (
        this.form.drugCode !== '' &&
        this.form.drugName !== '' &&
        this.form.drugCategoryID !== '' &&
        this.form.drugType !== ''
      ) {
        this.btnLoading = true
        addDrugApi({
          drugCode: this.form.drugCode,
          drugName: this.form.drugName,
          drugCategoryID: this.form.drugCategoryID,
          drugType: this.form.drugType
        })
          .then(res => {
            console.log('添加药品成功')
            this.$message('您填写的药品添加成功了喔~~')
            this.$emit('refreshDrugs')
          })
          .catch(res => {
            // console.log("没有拿到半句");
            // this.$message("~~~有地方出问题啦");
            this.$emit('refreshDrugs')
          })
      }
      this.btnLoading = false
      this.form = {
        id: null,
        drugCode: '',
        drugName: '',
        drugCategoryID: '',
        drugType: ''
      }
      this.$emit('refreshDrugs')
    }
  },
  components: {}
}
</script>
<style lang="scss">
.drug-dialog {
  .el-cascader {
    width: 100%;
  }
}
</style>
