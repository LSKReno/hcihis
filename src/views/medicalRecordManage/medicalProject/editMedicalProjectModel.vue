<template>
    <div>
        <div> <p style="font-size: 15px">常用模板</p> </div>
        <div>
            <el-input
                style="margin-top: 15px;width: 160px; float: left; margin-bottom: 5px; padding-top: 5px"
                size="mini"
                placeholder="搜索项目模板"
                prefix-icon="el-icon-search"
                v-model="medicalItemSearch"> </el-input>
            <span style="margin-top: 15px; margin-right: 10px; float: right">
                <i class="el-icon-circle-plus" style="color: #575A8F; "> </i>
                <el-button type="text" @click="handleAddedModelItems">添加</el-button>
            </span>
        </div>
        <div style="margin-left: 10px; margin-right: 10px; height: 200px;">
            <el-table
                    ref="multipleTable"
                    :data="filterMedicalItemModel"
                    @selection-change="handleSelectionChange"
                    :header-cell-style=tableHeader
                    max-height="150"
                    @row-click="handleClickRow">
                <el-table-column
                        label="模板名称"
                        prop="modelName"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="modelDescription"
                        label="模板备注"
                        width="120">
                </el-table-column>
            </el-table>
        </div>
        <div>
            <div><p style="margin-top: 10px;font-size: 15px">项目模板名称:  {{clickedMedicalProjectModel.modelName}}</p></div>
            <div style="margin-top: 10px"><p style="font-size: 15px">项目模板列表</p></div>
        </div>
        <div style="margin-top: 20px">
            <el-table
                :data="this.clickedMedicalProjectModel.itemList"
                :header-cell-style="tableHeader">
                <el-table-column prop="itemCode" label="项目编码" width="100"></el-table-column>
                <el-table-column prop="itemName" label="项目名称" width="120"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import {getTableMedicalItems as getTableMedicalItemsApi, getTableMedicalItemModel as getTableMedicalItemModelApi } from "../../../api/MedicalItems";
export default {
    name: 'editMedicalProjectModel',
    data () {
        return {
            tableDataMedicalProjectModel: [],
            medicalItemSearch: '',
            clickedMedicalProjectModel: '',
            handledAddedList: []
        }
    },
    methods: {
        tableHeader({row, column, rowIndex, columnIndex}) {
            if (rowIndex == 0) {
                return 'padding-top: 1px; padding-bottom: 1px; padding-right: 0px; padding-left: 0px; font-size: 12px'
            } else return 'font-size: 12px'
        },
        getTableMedicalItemModel() {
            getTableMedicalItemModelApi().then(res => {
                console.log('IModel', res)
                this.tableDataMedicalProjectModel = res.result.medicalItemModel
            })
        },
        handleClickRow(row) {
            this.clickedMedicalProjectModel = row
            console.log(this.clickedMedicalProjectModel)
        },
        handleAddedModelItems() {
            this.handledAddedList = []
            for (let i = 0; i < this.clickedMedicalProjectModel.itemList.length; i++) {
                let item = new Object()
                item.itemID = this.clickedMedicalProjectModel.itemList[i].itemID
                item.itemCode = this.clickedMedicalProjectModel.itemList[i].itemCode
                item.itemName = this.clickedMedicalProjectModel.itemList[i].itemName
                item.format = this.clickedMedicalProjectModel.itemList[i].format
                item.price = this.clickedMedicalProjectModel.itemList[i].price
                item.memonicCode = this.clickedMedicalProjectModel.itemList[i].memonicCode
                this.handledAddedList.push(item)
            }
            console.log(this.handledAddedList)
            this.$emit('handleAddedModelItems', this.handledAddedList)
        }
    },
    computed: {
        filterMedicalItemModel() {
            const search = this.medicalItemSearch
            return this.tableDataMedicalProjectModel.filter(data => {
                return Object.keys(data).some(key => {
                    return String(data[key]).toLowerCase().indexOf(search) > -1
                })
            })
            return  this.tableDataMedicalProjectModel
        }
    },
    created: function () {
        this.getTableMedicalItemModel()
    },
    props: {
        addedModel: Object
    },
    watch: {
        addedModel(val) {
            this.tableDataMedicalProjectModel.push(val)
        }
    }
}
</script>

<style>

</style>
