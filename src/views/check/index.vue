<template>
  <div class="app-container">
    <el-input v-model="id" placeholder="请输入单号" @keyup.enter.native="onSubmit"></el-input>
    <div style="margin-top: 20px;"></div>
    <el-button type="primary" @click="onSubmit">退货</el-button>
    <el-button @click="onCancel">取消</el-button>
  </div>
</template>

<script>
  import {setReturns} from "@/api/return";
  import {getCustomersById} from "@/api/customer";

  export default {
    data() {
      return {
        id: '',
      }
    },
    methods: {
      onSubmit: function() {
        getCustomersById(this.id).then(response => {
          return response.data
        }).then(data => {
          let returns = {id: this.id, realName: data.realName}
          setReturns(returns).then(response => {
            this.$message({
              type: "success",
              message: "ok!"
            })
          })
        })
      },
      onCancel: function () {
        // clear the input
        this.id = ''
      }
    }
  }
</script>
