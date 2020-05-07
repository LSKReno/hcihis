<template>
  <div>
    <ToolBar>
      <div class="animated bounceInRight">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          round
          @click="addPrescriptionTemplate"
        >添加处方模板</el-button>
      </div>

      <prescriptionTemplateAdder
        :title="prescriptionTemplateAdderTitle"
        :dialogFormVisible="dialogFormVisible"
        @val-change="prescriptionTemplateEditChange"
        @cancel="dialogFormVisible = false"
        @refreshPrescriptionTemplates="refreshPrescriptionTemplate"
      ></prescriptionTemplateAdder>

      <div style="float: right">
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
          style="background-color: rgb(210, 235, 230)"
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
        height="455px"
        style="width: 100%;border-bottom-left-radius:15px; border-bottom-right-radius: 15px;"
      >
        <el-table-column prop="id" label="id" width="60" sortable></el-table-column>
        <el-table-column prop="templateID" label="处方模板编码" sortable></el-table-column>
        <el-table-column prop="templateName" label="处方模板名称" sortable></el-table-column>
        <el-table-column prop="creationTime" label="创建时间"></el-table-column>
        <el-table-column prop="creationDoctorID" label="创建医生ID" width="200"></el-table-column>
        <el-table-column prop="useScope" label="适用范围" width="80"></el-table-column>

        <el-table-column prop="deleteTag" label="删除标记" width="100">
          <div slot-scope="scope" style="width: 100%;text-align: center">
            <el-tag v-if="scope.row.deleteTag" type="success" size="small">正常状态</el-tag>
            <el-tag v-else type="danger" size="small">删除状态</el-tag>
          </div>
        </el-table-column>

        <el-table-column label="操作" :render-header="tableAction" width="140">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="info"
              icon="el-icon-info"
              size="small"
              circle
            ></el-button>
            <el-button
              @click="updatePrescriptionTemplate(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
            ></el-button>
            <el-button
              @click="deletePrescriptionTemplate(scope.row)"
              v-if="scope.row.deleteTag != 0 "
              type="danger"
              icon="el-icon-delete"
              circle
              size="small"
            ></el-button>
            <el-button
              @click="deletePrescriptionTemplate(scope.row)"
              v-else
              icon="el-icon-check"
              circle
              size="small"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div align="center">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ToolBar from '@/components/ToolBar.vue'
import HelpHint from '@/components/HelpHint.vue'
import { prescriptionTemplatesTotal as prescriptionTemplatesTotalApi, allPrescriptionTemplate as prescriptionTemplateApi, deletePrescriptionTemplate as deletePrescriptionTemplateApi } from '../../api/prescriptionTemplate'

import prescriptionTemplateAdder from './prescriptionTemplateManipulate/prescriptionTemplateAdder'

export default {
    data () {
        return {
            prescriptionTemplateAdderTitle: '处方模板编写',
            dialogFormVisible: false,
            dialogFormVisiblePharmacyPrescriptionTemplate: false,
            pharmacyPrescriptionTemplateerTitle: '药房发药',
            pharmacyPrescriptionTemplateEditChange: '',
            prescriptionTemplateUpdatterTitle: '处方模板更新',
            prescriptionTemplateUpdatter: false,
            currentEditPrescriptionTemplate: [],
            searchParams: {
                prescriptionTemplateName: ''
            },
            tableDataPrescriptionTemplates: [],
            pageSize: 50,
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
                    this.tableDataPrescriptionTemplates[i].prescriptionTemplateName.indexOf(
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

        deletePrescriptionTemplate (row) {
            const self = this
            self.$confirm('此操作将删除该处方模板, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                roundButton: true
            })
                .then(() => {
                    deletePrescriptionTemplateApi({
                        id: row.id
                    })
                        .then(res => {
                            self.$notify({
                                title: '成功',
                                message:
                                    '处方模板名称为 ' +
                                    row.templateName +
                                    ' 的处方模板删除成功',
                                type: 'success',
                                offset: 60
                            })
                            self.refreshPrescriptionTemplate()
                        })
                        .catch(res => {
                            console.log('没有删除该处方模板')
                        })
                })
                .catch(() => {})
        },

        refreshPrescriptionTemplate () {
            prescriptionTemplateApi({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            })
                .then(res => {
                    console.log('得到所有处方模板res')
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
                    // console.log("得到所有处方模板数量res");
                    // console.log(res);
                    // console.log(res[0].prescriptionTemplatesTotal);
                    this.total = res[0].prescriptionTemplatesTotal
                })
                .catch(res => {
                    console.log('没有拿到处方模板数量')
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
