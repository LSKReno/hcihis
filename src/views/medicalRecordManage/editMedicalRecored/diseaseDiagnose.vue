<template>
  <div>
    <div style="height: 40px; margin-left: 10px">
      <span style="float: left; width: 100px;">
        <p style="font-size: 20px">疾病诊断</p>
      </span>
      <span style="float: left; margin-top: 2px">
        <p
          style="font-size: 13px; padding-top: 5px"
          :class="this.currentPatient.currentDisease.diagnoseStatus === '已确诊' ? 'set_grey':''"
        >{{ this.currentPatient.currentDisease.diagnoseStatus }}</p>
      </span>
      <span style="float: right; margin-right: 20px">
        <el-button-group>
          <el-button size="small" plain @click="saveDiseaseDiagnose" :disabled="itemDisabled">暂存</el-button>
          <el-button
            size="small"
            plain
            @click="setSubmittedMDiseaseDiagnose"
            :disabled="itemDisabled"
          >确诊</el-button>
        </el-button-group>
      </span>
    </div>
    <div style="height: 20px; margin-left: 10px">
      <span style="float: left; width: 100px">
        <p style="font-size: 17px">确诊情况</p>
      </span>
    </div>
    <!--
        <div style="margin-left: 10px">
            <el-radio v-model="currentPatient.currentDisease.diagnoseType" label="中医">中医</el-radio>
            <el-radio v-model="currentPatient.currentDisease.diagnoseType" label="西医">西医</el-radio>
    </div>-->
    <div style="margin-top: 10px; margin-left: 10px; margin-right: 5px">
      <p style="font-size: 15px">确诊疾病</p>
      <el-table
        :data="currentPatient.currentDisease.diseaseList"
        :message="menuData"
        :header-cell-style="tableHeader"
        :key="menuKey"
        max-height="200"
        style="width: 100%; height: 150px; margin: 5px 5px 5px 5px"
        :aria-disabled="itemDisabled"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <div
              style="padding-top: 1px; padding-bottom: 1px; font-size: 12px; margin: 0px 0px 0px 0px"
            >疾病名称: {{ props.row.diseaseName }}</div>
            <div
              style="padding-top: 1px; padding-bottom: 1px;  font-size: 12px"
            >疾病助记码: {{ props.row.memonicCode }}</div>
            <div
              style="padding-top: 1px; padding-bottom: 1px;  font-size: 12px"
            >ICD编码: {{ props.row.ICDCode }}</div>
          </template>
        </el-table-column>
        <el-table-column label="疾病名称" prop="diseaseName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              :disabled="itemDisabled"
              @click="handleDeleteDisease(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-left: 10px">
      <p style="font-size: 15px;float: left; padding-top: 3px">添加疾病</p>
      <el-input
        style="margin-left: 20px; width: 200px; float: left; margin-bottom: 5px"
        size="mini"
        placeholder="搜索疾病"
        prefix-icon="el-icon-search"
        v-model="diseaseSearch"
      ></el-input>
      <el-table
        :data="filteredDiseaseData"
        style="width: 100%"
        max-height="120"
        :header-cell-style="tableHeader"
      >
        <el-table-column prop="diseaseName" label="疾病名称"></el-table-column>
        <el-table-column prop="memonicCode" label="助记编码"></el-table-column>
        <el-table-column prop="ICDCode" label="ICD码"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="addRowDisease(scope.row)"
              type="text"
              size="small"
              :disabled="itemDisabled"
            >添加</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 15px; margin-left: 15px">
      <p style="font-size: 15px">诊断说明</p>
      <el-form style="margin-top: 5px">
        <el-form-item>
          <el-input
            size="medium"
            type="textarea"
            v-model="description"
            :disabled="itemDisabled"
            @change="setUnsaveMedRecord"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getTableDiseases as getTableDiseasesApi } from '../../../api/disease'

export default {
  name: 'DiseaseDiagnose',
  data () {
    return {
      menuKey: 1,
      menuData: '',
      tableDataDisease: [],
      diseaseSearch: '',
      buttonDisabled: [],
      itemDisabled: false,
      description: ''
    }
  },
  methods: {
    addRowDisease (row) {
      const name = row.diseaseName
      console.log(name)
      for (let i = 0; i < this.tableDataDisease.length; i++) {
        if (this.tableDataDisease[i].diseaseName === name) {
          const disease = {}
          disease.diseaseName = this.tableDataDisease[i].diseaseName
          disease.memonicCode = this.tableDataDisease[i].memonicCode
          disease.ICDCode = this.tableDataDisease[i].ICDCode
          disease.status = '已添加'
          console.log(disease)
          this.currentPatient.currentDisease.diseaseList.push(disease)
          this.tableDataDisease[i].isAdded = true
          this.tableDataDisease.splice(i, 1)
          break
        }
      }
      console.log(row)
      console.log(this.currentPatient.currentDisease.diseaseList)
    },
    getTableDiseases () {
      getTableDiseasesApi()
        .then(res => {
          console.log('diseases', res)
          this.tableDataDisease = res.result.diseases
        })
        .catch(res => {
          console.log(res)
        })
    },
    handleDeleteDisease (idx, row) {
      const disease = {}
      disease.diseaseName = this.currentPatient.currentDisease.diseaseList[idx].diseaseName
      disease.memonicCode = this.currentPatient.currentDisease.diseaseList[idx].memonicCode
      disease.ICDCode = this.currentPatient.currentDisease.diseaseList[idx].ICDCode
      this.currentPatient.currentDisease.diseaseList.splice(idx, 1)
      this.tableDataDisease.splice(0, 0, disease)
    },
    saveDiseaseDiagnose () {
      this.currentPatient.currentDisease.diagnoseStatus = '已保存'
    },
    setSubmittedMDiseaseDiagnose () {
      this.currentPatient.currentDisease.diagnoseStatus = '已确诊'
      this.itemDisabled = true
      alert('已确诊')
    },
    tableHeader ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'padding-top: 1px; padding-bottom: 1px; padding-right: 0px; padding-left: 0px; font-size: 12px'
      } else return 'font-size: 12px'
    }
  },
  computed: {
    filteredDiseaseData () {
      const search = this.diseaseSearch
      return this.tableDataDisease.filter(data => {
        return Object.keys(data).some(key => {
          return (
            String(data[key])
              .toLowerCase()
              .indexOf(search) > -1
          )
        })
      })
      // return this.tableDataDisease
    }
  },
  created: function () {
    this.getTableDiseases()
  },
  watch: {
    menuData () {
      ++this.menuKey
    }
  },
  props: {
    currentPatient: Object
  }
}
</script>

<style>
.set_grey {
  color: grey;
}
</style>
