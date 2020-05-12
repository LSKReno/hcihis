<template>
  <div>
    <div style="margin-top: 10px; width: 90%; height: 20px; background-color: #ECF0F5;">
      <i class="el-icon-success" style="margin-left: 50px; color: #575A8F;"></i>
      <el-button
        type="text"
        style="padding-top: 0px; padding-bottom: 0px"
        @click="confirmAddedItem"
      >开立项目</el-button>
      <i class="el-icon-delete" style="margin-left: 40px; color: #575A8F;"></i>
      <el-button
        type="text"
        style="padding-top: 0px; padding-bottom: 0px"
        @click="deleteAddedItem"
      >作废项目</el-button>
      <i class="el-icon-close" style="margin-left: 40px; color: #575A8F;"></i>
      <el-button
              type="text"
              style="padding-top: 0px; padding-bottom: 0px"
              @click="deleteAddedItem2"
      >删除项目</el-button>
      <i class="el-icon-refresh" style="margin-left: 40px; color: #575A8F;"></i>
      <el-button type="text" style="padding-top: 0px; padding-bottom: 0px" @click="refresh">刷新</el-button>
    </div>
    <div>
      <div style="margin-top: 10px; font-size: 12px">
        <p>合计金额: {{ totalCost }} {{ message }}</p>
      </div>
      <div style="margin-top: 5px; margin-right: 20px; height: 120px;">
        <template>
          <el-table
            ref="table1"
            :data="addedItems"
            @selection-change="handleAddedSelectionChange"
            :header-cell-style="tableHeader"
            max-height="100"
          >
            <el-table-column :selectable="checkSelectable" type="selection" width="55"></el-table-column>
            <el-table-column label="项目编码" prop="itemCode" width="80"></el-table-column>
            <el-table-column prop="itemName" label="项目名称" width="80"></el-table-column>
            <el-table-column prop="status" label="执行状态" width="80"></el-table-column>
            <el-table-column prop="price" label="单价" width="75"></el-table-column>
            <el-table-column label="检查结果" width="80">
              <template>
                <el-button type="text">查看详情</el-button>
              </template>
            </el-table-column>
            <!--<el-table-column
                                prop="address"
                                label="删除"
                                width="80">
                            <template slot-scope="scope">
                                <el-button type="text" >删除</el-button>
                            </template>
            </el-table-column>-->
          </el-table>
        </template>
      </div>
    </div>
    <div
      style="width: 90%; height: 100px;margin-left: 11px;
        border-style: solid; border-color: #575A8F; border-radius: 5px;"
    >
      <div style="margin-left: 10px">
        <div style="float: left; margin-top: 10px">
          <p style="width: 50px; float: left; font-size: 15px;">名称*</p>
          <el-input style="width: 250px" size="mini" clearable maxlength="10" v-model="name"></el-input>
        </div>
        <div style="float: left; margin-top: 10px">
          <p style="width: 50px; float: left; font-size: 15px;">备注*</p>
          <el-input style="width: 250px" type="textarea" autosize v-model="description"></el-input>
        </div>
        <div style="float: right; margin-right: 40px;  font-size: 15px">
          <i class="el-icon-document" style="color: #575A8F;"></i>
          <el-button type="text" @click="handleAddedModel">存为模板</el-button>
        </div>
      </div>
    </div>
    <div style="margin-top: 25px; height: 180px">
      <div>
        <p style="font-size: 15px; float: left; padding-top: 10px">项目列表</p>
        <el-input
          style="margin-left: 15px; width: 200px; float: left; margin-bottom: 5px; padding-top: 5px"
          size="mini"
          placeholder="搜索项目"
          prefix-icon="el-icon-search"
          v-model="itemSearch"
        ></el-input>
        <span style="margin-left: 100px;">
          <i class="el-icon-circle-plus" style="color: #575A8F; "></i>
          <el-button type="text" @click="addItem()">添加</el-button>
        </span>
      </div>
      <el-table
        ref="table2"
        :data="filteredItemData"
        @selection-change="handleSelectionChange"
        :header-cell-style="tableHeader"
        max-height="120"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="项目编码" prop="itemCode" width="90"></el-table-column>
        <el-table-column prop="itemName" label="项目名称" width="80"></el-table-column>
        <el-table-column prop="format" label="规格" width="50"></el-table-column>
        <el-table-column prop="price" label="单价" width="50"></el-table-column>
        <el-table-column prop="memonicCode" label="助记码" width="80"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getTableMedicalItems as getTableMedicalItemsApi } from '../../../api/MedicalItems'

export default {
  name: 'EditMedicalProject',
  data () {
    return {
      tableDataItems: [],
      itemSearch: '',
      addedItems: [],
      selectedTableItems: [],
      selectedAddedItems: [],
      message: '',
      name: '',
      description: ''
    }
  },
  methods: {
    tableHeader ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'padding-top: 1px; padding-bottom: 1px; padding-right: 0px; padding-left: 0px; font-size: 12px'
      } else return 'font-size: 12px'
    },
    getTableMedicalItems () {
      getTableMedicalItemsApi()
        .then(res => {
          console.log('MedicalItem: ', res.result)
          this.tableDataItems = res.result.medicalItems
          console.log(this.tableDataItems)
        })
        .catch(res => {
          console.log(res)
        })
    },
    haveAdded (item) {
      for (let i = 0; i < this.addedItems.length; i++) {
        if (this.addedItems[i].itemID === item.itemID) return true
      }
      return false
    },
    addItem () {
      let fo = 0
      if (this.selectedTableItems.length === 0) {
        this.$message.error('请选择所添加项目')
      }
      else {
        console.log('111')
        for (let i = 0; i < this.selectedTableItems.length; i++) {
          if (!this.haveAdded(this.selectedTableItems[i])) {
            const item = {}
            item.itemID = this.selectedTableItems[i].itemID
            item.itemCode = this.selectedTableItems[i].itemCode
            item.itemName = this.selectedTableItems[i].itemName
            item.format = this.selectedTableItems[i].format
            item.price = this.selectedTableItems[i].price
            item.memonicCode = this.selectedTableItems[i].memonicCode
            item.status = '暂存'
            this.addedItems.push(item)
          } else {
            fo = 1
          }
        }
        console.log(this.addedItems)
        if (fo) {
          this.$message.info('添加项中含有重复添加项目')
        }
        this.toggleSelectionTable2()
      }
    },
    handleSelectionChange (rows) {
      this.selectedTableItems = []
      if (rows) {
        for (let i = 0; i < rows.length; i++) {
          const item = {}
          item.itemID = rows[i].itemID
          item.itemCode = rows[i].itemCode
          item.itemName = rows[i].itemName
          item.format = rows[i].format
          item.price = rows[i].price
          item.memonicCode = rows[i].memonicCode
          this.selectedTableItems.push(item)
        }
      }
      console.log(this.selectedTableItems)
    },
    handleAddedSelectionChange (rows) {
      this.selectedAddedItems = rows
      console.log(this.selectedAddedItems)
    },
    confirmAddedItem () {
      if (this.selectedAddedItems.length > 0) {
        for (let i = 0; i < this.selectedAddedItems.length; i++) {
          this.selectedAddedItems[i].status = '已开立'
        }
        this.toggleSelectionTable1()
        this.$message.success('已开立')
      } else {
        this.$message.error('请选择开立项目')
      }
    },
    deleteAddedItem () {
      if (this.selectedAddedItems.length > 0) {
        for (let i = 0; i < this.selectedAddedItems.length; i++) {
          let hfound = 0
          for (let j = 0; j < this.addedItems.length && !hfound; j++) {
            if (
              this.selectedAddedItems[i].itemID === this.addedItems[j].itemID
            ) {
              hfound = 1
              if (this.addedItems[j].status !== '已开立') {
                this.$message.info('无法作废未开立项目')
                continue
              }
              this.addedItems[j].status = '已作废'
            }
          }
        }
        this.toggleSelectionTable1()
      } else {
        this.$message.error('请选择所作废项目')
      }
    },
    deleteAddedItem2 () {
      if (this.selectedAddedItems.length > 0) {
        for (let i = 0; i < this.selectedAddedItems.length; i++) {
          let hfound = 0
          for (let j = 0; j < this.addedItems.length && !hfound; j++) {
            if (
                    this.selectedAddedItems[i].itemID === this.addedItems[j].itemID
            ) {
              hfound = 1
              if (this.addedItems[j].status === '已开立') {
                this.$message.info('无法删除已开立项目')
                continue
              }
              this.addedItems.splice(j, 1)
            }
          }
        }
        this.toggleSelectionTable1()
      } else {
        this.$message.error('请选择所删除项目')
      }
    },
    handleAddedModel () {
      if (this.selectedAddedItems.length === 0) {
        this.$message.error('请为模板添加项目(勾选以添加项目)')
      }
      else if (this.name === '') {
        this.$message.error('请填写模板名称')
      } else if (this.description === '') {
        this.$message.error('请填写备注')
      }  else {
      const model = {}
      model.modelName = this.name
      model.modelDescription = this.description
      model.itemList = this.selectedAddedItems
      this.name = ''
      this.description = ''
      this.$emit('handleAddedModel', model)
      this.$message.success('保存成功')
      }
    },
    refresh() {
      if (this.addedItems.length > 0 && this.addedItems[0].status === '已开立'){
        this.addedItems[0].status = '执行中'
      }
      this.toggleSelectionTable1()
    },
    checkSelectable(row) {
      return row.status != '执行中'
    },
    toggleSelectionTable1() {
      this.$refs.table1.clearSelection()
    },
    toggleSelectionTable2() {
      this.$refs.table2.clearSelection()
    }
  },
  computed: {
    totalCost () {
      let price = 0
      console.log('TC', this.addedItems)
      for (let i = 0; i < this.addedItems.length; i++) {
        console.log('222', this.addedItems[i].price)
        price += parseInt(this.addedItems[i].price)
      }
      console.log(price)
      return price
    },
    filteredItemData () {
      const search = this.itemSearch
      if (search === '已选择') return this.selectedTableItems
      return this.tableDataItems.filter(data => {
        return Object.keys(data).some(key => {
          return (
            String(data[key])
              .toLowerCase()
              .indexOf(search) > -1
          )
        })
      })
      // return this.tableDataItems
    }
  },
  created: function () {
    this.getTableMedicalItems()
  },
  props: {
    addedModelItems: Array
  },
  watch: {
    addedModelItems (val) {
      let fo = 0
      for (let i = 0; i < val.length; i++) {
        if (!this.haveAdded(val[i])) {
          const item = {}
          item.itemID = val[i].itemID
          item.itemCode = val[i].itemCode
          item.itemName = val[i].itemName
          item.format = val[i].format
          item.price = val[i].price
          item.memonicCode = val[i].memonicCode
          item.status = '暂存'
          this.addedItems.push(item)
        } else {
          fo = 1
        }
      }
      if (fo) {
        this.$message.info('添加项中含有重复添加项目')
      }
      console.log(this.addedItems)
    }
  },
  components: {}
}
</script>

<style>
</style>
