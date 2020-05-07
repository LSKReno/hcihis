<template>
  <div>
    <el-card style="border-radius: 15px;" shadow="hover">
      <div slot="header">
        <span>东软云HIS系统</span>
      </div>
      <div class="demo">
        <img src="https://i.loli.net/2019/09/06/NS7rMvRkToB3JLn.png" style="width:40%;" />
      </div>
    </el-card>
    <br />
  </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    methods: {},
    mounted: function () {}
}
</script>
<style lang="scss">
.developmentTool {
    font-size: 30px;
}
.demo {
    margin: 10px;
    text-align: center;
    .grid-content {
        border-radius: 4px;
        overflow: hidden;
        color: #fff;
        background: #d3dce6;
        .index-icon {
            font-size: 82px;
            color: #fff;
        }
    }
}
</style>
