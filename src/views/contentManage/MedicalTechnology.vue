<template>
  <div>
    <ToolBar>
      <!-- 添加医技的 Modal，点击添加后在页面进行显示 -->
      <medical-technology-adder
        :title="medicalTechnologyAdderTitle"
        :dialogFormVisible="dialogFormVisible"
        @cancel="dialogFormVisible = false"
        @addMedicalTechnology="realAddMedicalTechnology"
      ></medical-technology-adder>

      <div class="tool-bar">
        <div class="export-action">
          <!-- 批量导入 -->
          <el-button type="primary" size="small" round @click="importDataEvent">批量导入</el-button>
          <!-- 批量导出 -->
          <el-button type="primary" size="small" round @click="exportDataEvent">批量导出</el-button>
        </div>
        <div style="display:flex;flex-direction:row;justify-content:space-between;">
          <div class="manipulate-action">
            <el-input
              v-model="filterName"
              placeholder="搜索医技"
              size="small"
              style="width: 200px"
              @change="searchMedicalTechnology"
              @clear="searchMedicalTechnology"
              clearable
            ></el-input>
            <el-button
              style="background-color: rgb(210, 235, 230);margin-left:10px;"
              icon="el-icon-search"
              size="small"
              round
              @click="searchMedicalTechnology"
            >查询医技项目</el-button>
            <!-- 添加医技 -->
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="small"
              round
              @click="addMedicalTechnology"
            >添加医技</el-button>
          </div>
          <div style="display:flex;flex-direction:row;align-items:center;">
            <span style="font-size:14px;">是否查看已删除的医技项目</span>
            <el-switch
              style="display: block;margin-left:10px;"
              v-model="deleteSwitch"
              active-color="#13ce66"
              @change="handeSwitchChange"
            ></el-switch>
          </div>
        </div>
      </div>
    </ToolBar>

    <div>
      <vxe-table
        ref="mtTable"
        export-config
        border
        resizable
        show-overflow
        :edit-config="{trigger: 'dblclick', mode: 'cell', activeMethod: activeCellMethod}"
        :data.sync="deleteSwitch? list:filterMedicalTechnologyTable"
        @edit-disabled="editDisabledEvent"
        style="border-radius:10px;"
      >
        <vxe-table-column type="index" width="30"></vxe-table-column>
        <vxe-table-column field="medicalTechnologyID" title="医技项目编码"></vxe-table-column>
        <vxe-table-column
          field="medicalTechnologyName"
          title="医技名称"
          :edit-render="{name: 'input'}"
        ></vxe-table-column>
        <vxe-table-column
          field="medicalTechnologySpecifications"
          title="医技规格"
          :edit-render="{name: 'input'}"
          type="html"
        ></vxe-table-column>
        <vxe-table-column field="category" title="所属类别" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column
          field="department"
          title="辅疗科室"
          :edit-render="{name: 'input'}"
        ></vxe-table-column>
        <vxe-table-column field="fee" title="项目费用" :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column
          field="pinyinMnemonic"
          title="拼音助记码"
          :edit-render="{name: 'input'}"
        ></vxe-table-column>
        <vxe-table-column field="deleted" title="删除标记">
          <template v-slot="{row}">
            <div style="width: 100%;text-align: center">
              <el-tag v-if="!row.deleted" type="success" size="small">正常状态</el-tag>
              <el-tag v-else type="danger" size="small">删除状态</el-tag>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="action" title="操作">
          <template v-slot="{row}">
            <el-button
              @click="deleteMedicalTechnology(row)"
              v-if="row.deleted === 0 "
              type="danger"
              icon="el-icon-delete"
              circle
              size="small"
            ></el-button>
            <el-button
              style="opacity:0.5;"
              @click="deleteMedicalTechnology(row)"
              v-else
              type="danger"
              icon="el-icon-delete"
              circle
              size="small"
            ></el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
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
import {
  medicalTechnologysTotal as medicalTechnologysTotalApi,
  allMedicalTechnology as medicalTechnologyApi
} from '../../api/medicalTechnology'

import medicalTechnologyAdder from './medicalTechnologyManipulate/medicalTechnologyAdder.vue'
import XEUtils from 'xe-utils'

export default {
  components: {
    ToolBar,
    HelpHint,
    medicalTechnologyAdder
  },
  data () {
    return {
      medicalTechnologyAdderTitle: '医技编写',
      dialogFormVisible: false,
      filterName: '', // searchParams
      deleteSwitch: true,
      medicalTechnologyTable: [],
      filterMedicalTechnologyTable: [],
      pageSize: 50,
      currentPage: 1,
      pageNum: 1,
      total: 0
    }
  },
  computed: {
    list () {
      const filterName = XEUtils.toString(this.filterName)
        .trim()
        .toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = [
          'medicalTechnologyName',
          'category',
          'medicalTechnologySpecifications',
          'department',
          'fee',
          'pinyinMnemonic'
        ]
        const rest = this.medicalTechnologyTable.filter(item =>
          searchProps.some(
            key =>
              XEUtils.toString(item[key])
                .toLowerCase()
                .indexOf(filterName) > -1
          )
        )
        return rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(
              filterRE,
              match => `${match}`
            )
          })
          return item
        })
      }
      return this.medicalTechnologyTable
    }
  },
  created () {
    this.refreshMedicalTechnology()
  },

  methods: {
    exportDataEvent () {
      this.$refs.mtTable.openExport({
        // 默认勾选源
        original: true
      })
    },
    importDataEvent () {
      this.$refs.mtTable.importData()
    },
    searchMedicalTechnology () {},

    editDisabledEvent ({ row, column }) {
      this.$message({
        message: '本列不可编辑',
        type: 'warning'
      })
    },
    // 可编辑table的一些方法
    activeCellMethod ({ column, columnIndex }) {
      return columnIndex !== 1
    },
    // 条目改变时
    handleCurrentChange (val) {
      this.pageNum = val
      this.refreshMedicalTechnology()
    },
    handeSwitchChange () {
      const filterMedicalTechnologyTable = this.medicalTechnologyTable.filter(
        item => {
          if (!this.deleteSwitch) {
            return item.deleted === 0
          }
        }
      )
      this.filterMedicalTechnologyTable = filterMedicalTechnologyTable
    },
    addMedicalTechnology () {
      const self = this
      self.dialogFormVisible = true
    },
    realAddMedicalTechnology (e) {
      this.medicalTechnologyTable.push(e)
      this.dialogFormVisible = false
    },
    handleClick (row) {
      this.$alert(row, '医技', {
        confirmButtonText: '确定',
        callback: action => {},
        roundButton: true
      })
    },
    getMedicalTechnologysTotal () {
      medicalTechnologysTotalApi({})
        .then(res => {
          this.total = res.result.medicalTechnologysTotal
        })
        .catch(res => {
          console.log('没有拿到医技数量')
        })
    },
    refreshMedicalTechnology () {
      medicalTechnologyApi({
        pageNum: this.pageNum,
        pageSize: this.pageSize
      })
        .then(res => {
          this.medicalTechnologyTable = res.result
        })
        .catch(res => {
          console.log('没有拿到医技')
        })
      this.getMedicalTechnologysTotal()
      this.dialogFormVisible = false
    },
    deleteMedicalTechnology (row) {
      const self = this
      self
        .$confirm(
          `此操作将${row.deleted ? '恢复' : '删除'}该医技, 是否继续?`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            roundButton: true
          }
        )
        .then(() => {
          self.$notify({
            title: '成功',
            message:
              '医技名称为 ' +
              row.medicalTechnologyName +
              ` 的医技${row.deleted ? '恢复' : '删除'}成功`,
            type: 'success',
            offset: 60
          })
          this.medicalTechnologyTable.forEach(item => {
            if (row.medicalTechnologyID === item.medicalTechnologyID) {
              item.deleted = row.deleted ? 0 : 1
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped>
.tool-bar {
  display: flex;
  flex-direction: column;
}

.export-action {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.manipulate-action {
  display: flex;
  flex-direction: row;
}
.keyword-lighten {
  color: #000;
  background-color: #ffff00;
}
</style>
