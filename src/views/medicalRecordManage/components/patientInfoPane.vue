<template>
    <div style="border-radius: 2px 2px 2px 2px;
    border-style: solid; border-color: lightgray;
    border-top-width: 0px; border-right-width: 1px; border-bottom-width: 0px; border-left-width: 0px;">
        <div style="margin: 5px 5px 5px 5px">
            <el-input
                style="margin-right: 10px;"
                size="mini"
                placeholder="搜索患者"
                prefix-icon="el-icon-search"
                v-model="search"> </el-input>
            <el-tabs v-model="activeTabName" @tab-click="changeTab">
                <el-tab-pane label="本人" name="doctor">
                    <el-collapse v-model="activePatientID" @change="handlePatientChange" accordion>
                        <el-collapse-item v-for="(patient, i) in filterPatientData" v-bind:name="i">
                            <template slot="title">
                                    {{patient.patientName}}  {{patient.patientStatus}}
                                    <div v-if="patient.patientStatus==='诊断中'"><i class="el-icon-loading" ></i></div>
                            </template>
                            <p>性别: {{patient.patientSex}}</p>
                            <p>年龄: {{patient.patientAge}}</p>
                            <p>住址: {{patient.patientAddress}}</p>
                        </el-collapse-item>
                    </el-collapse>
                </el-tab-pane>
                <el-tab-pane label="科室" name="department">
                    <el-table
                        :data="filterPatientData"
                        border
                        ref="table"
                        highlight-current-row
                        @row-click="getPatientInfo">
                        <el-table-column prop="patientName" label="姓名"></el-table-column>
                        <el-table-column prop="patientAge" label="年龄"></el-table-column>
                        <el-table-column prop="patientAddress" label="地址"></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import { getPatientByDoctor as getPatientByDoctorApi,
        getPatientByDepartment as getPatientByDepartmentApi } from '../../../api/doctor'
    import { getUserInfo } from '../../../utils/dataStorage'
    import { login as loginApi } from '../../../api/auth';

    export default {
        name: 'PatientInfoPane',
        data () {
            return {
                activeTabName: 'doctor',
                activePatientID: '',
                currentPatient: null,
                tableDataPatient: [],
                search: ''
            }
        },

        methods: {
            changeTab() {
                console.log('activeTabName: ', this.activeTabName)
                if (this.activeTabName == 'doctor') {
                    this.getPatientByDoctor()
                } else {
                    this.getPatientByDepartment()
                }
                console.log('end')
            },

            handlePatientChange() {
                console.log(this.activePatientID)
                this.currentPatient = this.tableDataPatient[this.activePatientID]
                console.log(this.currentPatient)
                this.$emit('handleCurrentPatient', this.currentPatient)
            },

            getPatientInfo() {

            },

            getPatientByDoctor() {
                getPatientByDoctorApi()
                    .then(res => {
                        this.tableDataPatient = res.result.patientList
                        console.log(this.tableDataPatient)
                    })
                    .catch(res => {
                    })
            },

            getPatientByDepartment() {
                getPatientByDepartmentApi()
                    .then(res => {
                        this.tableDataPatient = res.result.patientList
                        console.log(this.tableDataPatient)
                    })
                    .catch(res => {
                    })
            },
        },
        computed: {
            filterPatientData () {
                const search = this.search
                return this.tableDataPatient.filter(data => {
                    return Object.keys(data).some(key => {
                        return String(data[key]).toLowerCase().indexOf(search) > -1
                    })
                })
                return  this.tableDataPatient
            }
        },
        created: function () {
          this.changeTab()
        },
        components: {

        }
    }
</script>

<style>

</style>
