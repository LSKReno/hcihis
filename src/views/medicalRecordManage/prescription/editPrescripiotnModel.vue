<template>
  <div>
    <el-tabs v-model="activePageName" @tab-click="changePageTab">
      <el-tab-pane label="药品列表" name="1">
        <div>
          <el-input
            style="margin-left: 15px; width: 150px; float: left; margin-bottom: 5px; padding-top: 5px"
            size="mini"
            placeholder="搜索药品"
            prefix-icon="el-icon-search"
            v-model="diseaseSearch"
          ></el-input>
          <span style="margin-right: 5px; float: right">
            <el-button type="text" icon="el-icon-circle-plus">增药</el-button>
          </span>
        </div>
        <div>
          <el-table
            :data="data"
            :message="menuData"
            :header-cell-style="tableHeader"
            :key="menuKey"
            max-height="200"
            style="width: 100%; height: 150px; margin: 5px 5px 5px 5px"
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
            <el-table-column label="药品名称" prop="diseaseName"></el-table-column>
            <el-table-column label="规格" prop="diseaseName"></el-table-column>
            <el-table-column label="单价" prop="diseaseName"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="常用模板" name="2">
        <div>
          <el-input
            style="margin-top: 15px;width: 160px; float: left; margin-bottom: 5px; padding-top: 5px"
            size="mini"
            placeholder="搜索项目"
            prefix-icon="el-icon-search"
            v-model="diseaseSearch"
          ></el-input>
          <span style="margin-top: 15px; margin-right: 10px; float: right">
            <i class="el-icon-circle-plus" style="color: #575A8F; "></i>
            <el-button type="text">添加</el-button>
          </span>
        </div>
        <div style="margin-left: 10px; margin-right: 10px; height: 200px;">
          <el-table
            ref="multipleTable"
            :data="tableData"
            @selection-change="handleSelectionChange"
            :header-cell-style="tableHeader"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="模板名称" width="80"></el-table-column>
            <el-table-column prop="name" label="模板备注" width="120"></el-table-column>
          </el-table>
        </div>
        <div>
          <div>
            <p style="margin-top: 10px;font-size: 15px">项目模板名称:</p>
          </div>
          <div style="margin-top: 10px">
            <p style="font-size: 15px">项目模板列表</p>
          </div>
        </div>
        <div style="margin-top: 20px">
          <el-table :data="data" :header-cell-style="tableHeader">
            <el-table-column label="项目编码" width="80"></el-table-column>
            <el-table-column label="项目名称" width="120"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'EditPrescriptionModel'
}
</script>

<style>
</style>
