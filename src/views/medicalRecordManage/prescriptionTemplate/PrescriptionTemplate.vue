<template>
  <div>
    <ToolBar>
      <div style="float: left">
        <el-input
          placeholder="搜索处方模板名称"
          size="small"
          style="width: 200px"
          v-model="searchParams.prescriptionTemplateName"
          @change="searchPrescriptionTemplate"
          @clear="searchPrescriptionTemplate"
          clearable
        ></el-input>
        <el-button
          style="background-color: rgb(210, 235, 230);margin-left:10px;"
          icon="el-icon-search"
          size="small"
          round
          @click="searchPrescriptionTemplate"
        ></el-button>
      </div>
    </ToolBar>

    <div class="animated fadeInUp">
      <el-table
        :data="tableDataPrescriptionTemplates"
        border
        ref="table"
        height="260px"
        style="width: 100%"
        @row-click="getPrescriptionTemplateDetails"
      >
        <el-table-column prop="templateName" label="处方模板名称" width="230" sortable></el-table-column>
        <el-table-column prop="useScope" label="适用范围" width="120" sortable></el-table-column>

      </el-table>
    </div>
    <!-- <div align="center">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div> -->
  </div>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue'
import HelpHint from '@/components/HelpHint.vue'
import { prescriptionTemplatesTotal as prescriptionTemplatesTotalApi, allPrescriptionTemplate as prescriptionTemplateApi } from '../../../api/prescriptionTemplate'

import prescriptionTemplateAdder from '../../contentManage/prescriptionTemplateManipulate/prescriptionTemplateAdder'
import { getPrescriptionTemplateDetails as getPrescriptionTemplateDetailsApi } from '../../../api/prescriptionTemplateDetails'
import { getToken } from '../../../utils/dataStorage'

export default {
    name: 'PrescriptionTemplate',
    data () {
        return {
            prescriptionTemplateAdderTitle: '处方模板编写',
            dialogFormVisible: false,
            dialogFormVisiblePharmacyPrescriptionTemplate: false,
            currentEditPrescriptionTemplate: [],
            searchParams: {
                prescriptionTemplateName: ''
            },
            tableDataPrescriptionTemplates: [],
            pageSize: 5,
            currentPage: 1,
            pageNum: 1,
            total: 0
        }
    },
    methods: {
        searchPrescriptionTemplate () {
            const tableRow = this.$refs.table.$el.querySelectorAll('tbody tr')
            const tableRowHeight = tableRow[1].offsetHeight
            let isjump = false
            for (
                let i = 0;
                i < this.tableDataPrescriptionTemplates.length;
                i++
            ) {
                if (
                    this.searchParams.prescriptionTemplateName &&
                    this.tableDataPrescriptionTemplates[i].templateName.indexOf(
                        this.searchParams.prescriptionTemplateName
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
            this.refreshPrescriptionTemplate()
        },
        addPrescriptionTemplate () {
            const self = this
            self.dialogFormVisible = true
        },
        handleClick (row) {
            this.$alert(row, '处方模板', {
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
                        content: '查看处方模板 / 编辑处方模板 / 删除处方模板 '
                    }
                },
                '操作'
            )
        },
        refreshPrescriptionTemplate () {
            prescriptionTemplateApi({
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                doctorID: getToken()

            })
                .then(res => {
                    console.log('得到该用户能看到的所有处方模板res')
                    console.log(res)
                    this.tableDataPrescriptionTemplates = res
                })
                .catch(res => {
                    console.log('没有拿到处方模板')
                })
            this.getPrescriptionTemplatesTotal()
            this.dialogFormVisible = false
        },
        getPrescriptionTemplatesTotal () {
            prescriptionTemplatesTotalApi({})
                .then(res => {
                    console.log('得到所有处方模板数量res')
                    console.log(res)
                    // console.log(res[0].prescriptionTemplatesTotal);
                    this.total = res[0].medicinePrescriptionTemplatesTotal
                })
                .catch(res => {
                    console.log('没有拿到处方模板数量')
                })
        },
        getPrescriptionTemplateDetails (row, column, event) {
            getPrescriptionTemplateDetailsApi({
                templateID: row.templateID
            })
                .then(res => {
                    // console.log("得到所有处方模板明细res");
                    console.log(res)
                    this.$emit('getPrescriptionTemplateDetails', res)
                })
                .catch(res => {
                })
        }
    },

    created () {
        this.refreshPrescriptionTemplate()
    },

    components: {
        ToolBar,
        HelpHint,
        prescriptionTemplateAdder
    }
}
</script>
