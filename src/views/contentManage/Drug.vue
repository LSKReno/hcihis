<template>
  <div>
    <ToolBar>
      <div class="animated bounceInRight">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          round
          @click="addDrug"
        >添加药品</el-button>
      </div>
      <!-- <div class="animated bounceInRight">
                <el-button
                    type="primary"
                    icon="el-icon-plus"
                    size="small"
                    round
                    @click="pharmacyDrug"
                >门诊发药</el-button>
            </div> -->

      <pharmacyDruger
        :title="pharmacyDrugerTitle"
        @cancel="dialogFormVisiblePharmacyDrug = false"
        @refreshDrugs="refreshDrug"
        style="margin-top:10px;"
      ></pharmacyDruger>

      <drugAdder
        :title="drugAdderTitle"
        :dialogFormVisible="dialogFormVisible"
        @cancel="dialogFormVisible = false"
        @refreshDrugs="refreshDrug"
      ></drugAdder>

      <!-- <drugUpdatter
                :title="drugUpdatterTitle"
                :dialogFormVisible="drugUpdatter"
                :data="currentEditDrug"
                @cancel="drugUpdatter = false"
                @refreshDrugs="refreshDrug"
            ></drugUpdatter> -->

      <div style="float: left;opacity:0.99;">
        <el-input
          placeholder="搜索药品名称"
          size="small"
          style="width: 200px"
          v-model="searchParams.drugName"
          @change="searchDrug"
          @clear="searchDrug"
          clearable
        ></el-input>
        <el-button
          style="background-color: rgb(210, 235, 230)"
          icon="el-icon-search"
          size="small"
          round
          @click="searchDrug"
        ></el-button>
      </div>
    </ToolBar>

    <div class="animated fadeInUp">
      <el-table
        :data="tableDataDrugs"
        border
        ref="table"
        height="455px"
        style="width: 100%;border-bottom-left-radius:15px; border-bottom-right-radius: 15px;"
      >
        <el-table-column prop="id" label="id" width="60" sortable></el-table-column>
        <el-table-column prop="drugID" label="药品编码" sortable></el-table-column>
        <el-table-column prop="drugName" label="药品名称" sortable></el-table-column>
        <el-table-column prop="drugSpecifications" label="药品规格"></el-table-column>
        <el-table-column prop="packingUnit" label="包装单位" width="80"></el-table-column>
        <el-table-column prop="manufacturer" label="生产厂家" sortable></el-table-column>
        <el-table-column prop="drugDosageForm" label="药品剂型" width="80"></el-table-column>
        <el-table-column prop="drugType" label="药品类型" width="80"></el-table-column>
        <el-table-column prop="drugUnitPrice" label="药品单价" sortable></el-table-column>
        <el-table-column prop="pinyinMnemonic" label="拼音助记码" sortable></el-table-column>
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
              @click="updateDrug(scope.row)"
              type="primary"
              icon="el-icon-edit"
              size="small"
              circle
            ></el-button>
            <el-button
              @click="deleteDrug(scope.row)"
              v-if="scope.row.deleteTag != 0 "
              type="danger"
              icon="el-icon-delete"
              circle
              size="small"
            ></el-button>
            <el-button
              @click="deleteDrug(scope.row)"
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
import { drugsTotal as drugsTotalApi, allDrug as drugApi, deleteDrug as deleteDrugApi } from '../../api/drug'

import drugAdder from './drugManipulate/drugAdder.vue'
import drugUpdatter from './drugManipulate/drugUpdatter.vue'
import pharmacyDruger from './pharmacyDrug/pharmacyDruger.vue'

export default {
    data () {
        return {
            drugAdderTitle: '药品编写',
            dialogFormVisible: false,
            dialogFormVisiblePharmacyDrug: false,
            pharmacyDrugerTitle: '药房发药',
            pharmacyDrugEditChange: '',
            drugUpdatterTitle: '药品更新',
            drugUpdatter: false,
            currentEditDrug: [],
            searchParams: {
                drugName: ''
            },
            tableDataDrugs: [],
            pageSize: 50,
            currentPage: 1,
            pageNum: 1,
            total: 0
        }
    },
    methods: {
        searchDrug () {
            const tableRow = this.$refs.table.$el.querySelectorAll('tbody tr')
            const tableRowHeight = tableRow[1].offsetHeight
            let isjump = false
            for (let i = 0; i < this.tableDataDrugs.length; i++) {
                if (
                    this.searchParams.drugName &&
                    this.tableDataDrugs[i].drugName.indexOf(
                        this.searchParams.drugName
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
            this.refreshDrug()
        },
        addDrug () {
            const self = this
            self.dialogFormVisible = true
        },
        pharmacyDrug () {
            const self = this
            self.dialogFormVisiblePharmacyDrug = true
        },
        handleClick (row) {
            this.$alert(row, '药品', {
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
                        content: '查看药品 / 编辑药品 / 删除药品 '
                    }
                },
                '操作'
            )
        },

        deleteDrug (row) {
            const self = this
            self.$confirm('此操作将删除该药品, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                roundButton: true
            })
                .then(() => {
                    deleteDrugApi({
                        id: row.id
                    })
                        .then(res => {
                            self.$notify({
                                title: '成功',
                                message:
                                    '药品名称为 ' +
                                    row.drugName +
                                    ' 的药品删除成功',
                                type: 'success',
                                offset: 60
                            })
                            self.refreshDrug()
                        })
                        .catch(res => {
                            console.log('没有删除该药品')
                        })
                })
                .catch(() => {})
        },

        refreshDrug () {
            drugApi({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            })
                .then(res => {
                    console.log('得到所有药品res')
                    console.log(res)
                    this.tableDataDrugs = res
                })
                .catch(res => {
                    console.log('没有拿到药品')
                })
            this.getDrugsTotal()
            this.dialogFormVisible = false
        },
        getDrugsTotal () {
            drugsTotalApi({})
                .then(res => {
                    // console.log("得到所有药品数量res");
                    // console.log(res);
                    // console.log(res[0].drugsTotal);
                    this.total = res[0].drugsTotal
                })
                .catch(res => {
                    console.log('没有拿到药品数量')
                })
        }
    },

    created () {
        this.refreshDrug()
    },

    components: {
        ToolBar,
        HelpHint,
        drugAdder,
        drugUpdatter,
        pharmacyDruger
    }
}
</script>
