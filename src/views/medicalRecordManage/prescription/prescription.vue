<template>
  <div>
    <div
      style="margin-left: 10px; margin-right: 10px; width: 60%; height: 500px;
                    border-style: solid; border-color: lightgray;
                    border-top-width: 0px; border-right-width: 1px;
                    border-bottom-width: 0px; border-left-width: 0px; float: left"
    >
      <editPrescription></editPrescription>
    </div>
    <div style="margin-left: 10px; margin-right: 10px; width: 35%; height: 100px; float: right">
      <editPrescriptionModel></editPrescriptionModel>
    </div>
  </div>
</template>

<script>
import editPrescription from './editPrescription'
import editPrescriptionModel from './editPrescripiotnModel'
export default {
  name: 'Prescription',
  data () {
    return {}
  },
  methods: {},
  computed: {},
  props: {},
  components: {
    editPrescription,
    editPrescriptionModel
  }
}
</script>

<style>
</style>
