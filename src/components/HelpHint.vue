<template>
  <span>
    <span style="margin-right: 8px"><slot></slot></span>
    <el-tooltip :content="content" :placement="placement">
      <i class="el-icon-question" style="cursor: pointer;"></i>
    </el-tooltip>
  </span>
</template>
<script>
  export default {
    name: 'HelpHint',
    props: {
      placement: {
        type: String,
        default: 'top'
      },
      content: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    }
  }
</script>
