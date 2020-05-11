<template>
    <div style="margin-left: 20px; margin-top: 5px;">
        <el-tabs v-model="activePageName" @tab-click="changePageTab">
            <el-tab-pane label="查看患者病历" name="browseMedRecord">

            </el-tab-pane>
            <el-tab-pane label="编辑病历" name="editMedRecord">
            </el-tab-pane>
            <el-tab-pane label="检查检验项目" name="medicalProject">
            </el-tab-pane>
            <el-tab-pane label="处方" name="prescription">
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    export default {
        name: 'OverallTabPane',
        data () {
            return{

            }
        },
        methods: {
            changePageTab () {

            }
        }
    }
</script>

<style>

</style>
