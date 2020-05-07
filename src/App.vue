<template>
  <div id="app">
    <router-view name="blank"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style lang="scss">
#app {
    background-color: #c07878;
    // font-family:'Courier New', Courier, monospace;
}
.el-table__header {
    font-size: 0.85rem;
}
.el-table {
    font-size: 0.75rem;
}
.el-table__body tr,
.el-table__body td {
    padding: 0;
    height: 40px;
}
.el-input{
    border-radius:20px;
}
.el-card{
    border-radius: 15px;
}

</style>
