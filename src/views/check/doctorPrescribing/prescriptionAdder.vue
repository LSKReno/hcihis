<template>
  <div class="prescription-dialog animated fadeInLeft">
    <div style="text-align:center;position:fixed;z-index:-1">
      <img src="https://i.loli.net/2019/09/06/NS7rMvRkToB3JLn.png" style="width:75%;opacity:0.6" />
    </div>
    <el-form :inline="true" :model="form" style="opacity:0.99">
      <el-form-item label="挂号ID*">
        <el-input v-model="form.registeredID" placeholder="此处填写挂号ID" disabled></el-input>
      </el-form-item>
      <el-form-item label="处方名称*">
        <el-input v-model="form.prescriptionName" placeholder="此处填写处方名称" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="多选药品*">
        <el-select
          style="width:500px;max-height:118px"
          v-model="selectedDrugList"
          @change="pushDrugIDInTable"
          multiple
          filterable
          placeholder="请选择药品名称"
        >
          <el-option
            v-for="item in options"
            :key="item.drugID"
            :label="item.drugName"
            :value="item.drugID"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      <vxe-table
        border
        resizable
        show-overflow
        row-id="id"
        :data.sync="selectedDrugTable"
        :edit-config="{trigger: 'dblclick', mode: 'cell', activeMethod: activeCellMethod}"
        @edit-disabled="editDisabledEvent"
        max-height="330px"
        style="border-radius:10px;"
      >
        >
        <vxe-table-column type="index" width="30"></vxe-table-column>
        <vxe-table-column field="drugID" title="药品ID" :edit-render="{name: 'input'}" width="80"></vxe-table-column>
        <vxe-table-column field="drugName" title="药品名称" :edit-render="{name: 'input'}" width="120"></vxe-table-column>
        <vxe-table-column
          field="drugSpecifications"
          title="规格"
          :edit-render="{name: 'input'}"
          width="85"
        ></vxe-table-column>
        <vxe-table-column
          field="drugUnitPrice"
          title="单价"
          :edit-render="{name: 'input'}"
          width="75"
        ></vxe-table-column>
        <vxe-table-column field="usage" title="用法" :edit-render="{name: 'input'}" width="70"></vxe-table-column>
        <vxe-table-column field="frequency" title="频次" :edit-render="{name: 'input'}" width="100"></vxe-table-column>
        <vxe-table-column field="amount" title="数量" :edit-render="{name: 'input'}" width="70"></vxe-table-column>
      </vxe-table>
    </div>
    <div style="margin:10px">
      <el-form>
        <el-form-item label="处方药品合计费用">
          <el-tag
            style="background-color:rgb(218, 235, 235);color:#339999"
            size="medium"
          >{{ prescriptionFee }}</el-tag>
        </el-form-item>
      </el-form>
    </div>

    <div class="dialog-footer" style="margin:20px 0">
      <el-button round @click="resetPrescription">重 置</el-button>
      <el-button round type="primary" :loading="btnLoading" @click="btnOk">确 定</el-button>
    </div>
  </div>
</template>

<script>
import ScrollPane from '@/components/ScrollPane.vue'

import { addPrescription as addPrescriptionApi } from '../../../api/prescription'
import { getDrugOptions as getDrugOptionsApi } from '../../../api/drug'

export default {
  name: 'PrescriptionAdder',
  props: {
    dialogFormVisible: Boolean,
    registeredID: String,
    prescriptionTemplateDetails: Array,
    title: String
  },
  data () {
    return {
      options: [],
      selectedDrugList: [],
      selectedDrugTable: [
        // {
        //     drugID:"",
        //     drugName:"",
        //     drugUnitPrice:"",
        //     drugSpecifications:"",
        //     usage:"",
        //     frequency:"",
        //     amount:""
        // }
      ],
      form: {
        id: null,
        registeredID: '',
        prescriptionName: ''
      },
      prescriptsList: [],
      btnLoading: false
    }
  },
  watch: {
    registeredID: {
      handler (newValue, oldValue) {
        this.form.registeredID = newValue
      },
      deep: true
    },
    prescriptionTemplateDetails: {
      handler (newValue, oldValue) {
        this.selectedDrugList = []
        this.selectedDrugTable = newValue
        newValue.forEach(e => {
          this.selectedDrugList.push(e.drugID)
        })
      },
      deep: true
    }
  },
  computed: {
    prescriptionFee () {
      // 计算处方各个药品总费用
      let fee = 0
      this.selectedDrugTable.forEach(e => {
        fee += e.drugUnitPrice * e.amount
      })
      return fee
    }
  },
  methods: {
    // 可编辑table的一些方法
    activeCellMethod ({ column, columnIndex }) {
      return (
        columnIndex !== 1 &&
        columnIndex !== 2 &&
        columnIndex !== 3 &&
        columnIndex !== 4
      )
    },
    editDisabledEvent ({ row, column }) {
      this.$message({
        message: '本列不可编辑',
        type: 'warning'
      })
    },

    resetPrescription () {
      this.form.registeredID = ''
      this.form.prescriptionName = ''
      this.selectedDrugList = []
      this.selectedDrugTable = []
    },
    btnOk () {
      if (this.form.registeredID === '') {
        this.$message('挂号ID不可以为空喔~~')
      } else if (this.form.prescriptionName === '') {
        this.$message('处方名称不可以为空喔~~')
      } else if (this.selectedDrugList.length === 0) {
        this.$message('药品不可以为空喔~~')
      } else if (
        this.form.registeredID !== '' &&
        this.form.prescriptionName !== '' &&
        this.selectedDrugList.length !== 0
      ) {
        this.btnLoading = true
        console.log(this.selectedDrugList)
        addPrescriptionApi({
          registeredID: this.form.registeredID,
          prescriptionName: this.form.prescriptionName,
          selectedDrugTable: this.selectedDrugTable
        })
          .then(res => {
            // console.log(res);
            if (res[0].status === 200) {
              console.log('开具处方成功')
              this.$message('您开具的处方添加成功了喔~~')
              this.form = {
                id: null,
                registeredID: '',
                prescriptionName: ''
              }
              this.selectedDrugList = []
              this.selectedDrugTable = []
            } else if (res[0].status === 1) {
              this.$message('该挂号ID不存在喔~~')
            } else if (res[0].status === 2) {
              this.$message(
                '该患者还未看诊,请填写病历后,选择已诊患者再来开处方吧~~'
              )
            } else if (res[0].status === 3) {
              this.$message('该患者已经推过号啦,您不可以再给他开处方了喔~~')
              this.form = {
                id: null,
                registeredID: '',
                prescriptionName: ''
              }
              this.selectedDrugList = []
              this.selectedDrugTable = []
            }
          })
          .catch(res => {
            // this.$emit("refreshMedicalRecord");
          })
      }
      this.btnLoading = false

      this.$emit('refreshMedicalRecord')
    },
    getDrugOptionsList () {
      getDrugOptionsApi({})
        .then(res => {
          // console.log(res)
          this.options = res
        })
        .catch(res => {
          // this.$emit("refreshPrescriptions");
        })
    },
    pushDrugIDInTable () {
      const drugTable = []
      this.selectedDrugList.forEach(element => {
        let selectedDrugName = ''
        let selectedDrugUnitPrice = 0
        let selectedDrugSpecifications = 0
        this.options.forEach(e => {
          if (e.drugID === element) {
            selectedDrugName = e.drugName
            selectedDrugUnitPrice = e.drugUnitPrice
            selectedDrugSpecifications = e.drugSpecifications
          }
        })
        drugTable.push({
          drugID: element,
          drugName: selectedDrugName,
          drugUnitPrice: selectedDrugUnitPrice,
          drugSpecifications: selectedDrugSpecifications,
          usage: '',
          frequency: '',
          amount: 1
        })
      })
      this.selectedDrugTable = drugTable
    }
  },
  mounted () {
    this.getDrugOptionsList()
  },
  components: {
    ScrollPane
  }
}
</script>

<style lang="scss">
@import "vxe-table/styles/variable.scss";
$vxe-font-color: rgb(130, 192, 192); // 主题颜色
$vxe-zindex: 3000; // 对于在某些场景中，由于堆叠被覆盖时可能会用到
@import "vxe-table/styles/default.scss";
.prescription-dialog {
  width: 632px;
}
</style>
