<template>
    <div>
        <div style="margin-left: 10px; margin-right: 10px; width: 60%; height: 500px;
                    border-style: solid; border-color: lightgray;
                    border-top-width: 0px; border-right-width: 1px;
                    border-bottom-width: 0px; border-left-width: 0px; float: left">
            <editMedicalProject :addedModelItems="addedModelItems" @handleAddedModel="getAddedModel"> </editMedicalProject>
        </div>
        <div style="margin-left: 10px; margin-right: 10px; width: 35%; height: 100px; float: right;">
            <editMedicalProjectModel :addedModel="addedModel" @handleAddedModelItems="getAddedModelItem"> </editMedicalProjectModel>
        </div>
    </div>
</template>

<script>
import editMedicalProject from './editMedicalProject'
import editMedicalProjectModel from './editMedicalProjectModel'

export default {
    name: 'medicalProject',
    data () {
        return {
            addedModel: Object,
            addedModelItems: []
        }
    },
    methods: {
        getAddedModelItem(addedModelItems) {
            this.addedModelItems = addedModelItems
            console.log("AMI", this.addedModelItems)
        },
        getAddedModel(addedModel) {
            this.addedModel = addedModel
            console.log('AM', this.addedModel)
        }
    },
    computed: {

    },
    props: {

    },
    components: {
        editMedicalProject,
        editMedicalProjectModel
    }
}
</script>

<style>

</style>
