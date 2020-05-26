<template>
  <div class="app-container">
    <el-input v-model="input" placeholder="请输入单号"></el-input>
    <div style="margin-top: 20px;"></div>
    <el-button type="primary" @click="onSubmit">退货</el-button>
    <el-button @click="onCancel">取消</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: ''
      }
    },
    methods: {
      onSubmit: function() {
        this.$message({
          message: 'success!',
          type: 'success'
        })
      },
      onCancel: function () {
        // clear the input
        this.input = ''
      }
    }
  }
</script>
