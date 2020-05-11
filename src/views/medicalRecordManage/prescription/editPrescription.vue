<template>
    <div>
        <div style="margin-top: 10px; width: 90%; height: 20px; background-color: #ECF0F5;">
            <i class="el-icon-success" style="margin-left: 50px; color: #575A8F;"> </i>
            <el-button type="text" style="padding-top: 0px; padding-bottom: 0px">开立处方</el-button>
            <i class="el-icon-delete" style="margin-left: 80px; color: #575A8F;"> </i>
            <el-button type="text" style="padding-top: 0px; padding-bottom: 0px">作废处方</el-button>
            <i class="el-icon-refresh" style="margin-left: 80px; color: #575A8F;"> </i>
            <el-button type="text" style="padding-top: 0px; padding-bottom: 0px">刷新</el-button>
        </div>
            <div style="margin-left: 10px; width: 400px; margin-top: 10px">
                <el-collapse  v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="添加处方" name="1">
                        <div style="float: left">
                            <p style="width: 50px; float: left; font-size: 15px; margin-top: 5px">名称</p>
                            <div style="margin-top: 5px">
                                <el-input style="width: 300px" size="mini" clearable maxlength="10"> </el-input>
                            </div>
                        </div>
                        <div style="float: left">
                            <p style="width: 50px; float: left; font-size: 15px; margin-top: 5px">备注</p>
                            <div style="margin-top: 5px">
                                <el-input style="width: 300px"  type="textarea" autosize> </el-input>
                            </div>
                        </div>
                        <div style="float: right"> <el-button icon="el-icon-circle-plus" type="text"> 添加</el-button></div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        <div>
            <div style="margin-top: 5px; margin-left:5px; margin-right: 50px; height: 150px">
                <template>
                    <el-table
                            ref="multipleTable"
                            :data="tableData"
                            @selection-change="handleSelectionChange"
                            :header-cell-style=tableHeader>
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                label="处方名称"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="备注"
                                width="200">
                        </el-table-column>
                        <el-table-column
                                prop="address"
                                label="状态"
                                width="80">
                        </el-table-column>
                    </el-table>
                </template>
            </div>
        </div>
        <div style="margin-top: 10px; height: 180px">
            <div style="margin-right: 60px; margin-left: 5px">
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        @selection-change="handleSelectionChange"
                        :header-cell-style=tableHeader>
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            label="药品名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="规格"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="单价"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="生产厂家"
                            width="120">
                    </el-table-column>
                </el-table>
        </div>
        </div>
    </div>
</template>

<script>
export default  {
    name: 'editPrescription',
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {

    },
    props: {

    }
}
</script>

<style>

</style>
