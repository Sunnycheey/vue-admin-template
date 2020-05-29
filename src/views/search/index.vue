<template>
  <div class="app-container">
    <h3 style="text-align: center"> 查询退订情况（通过用户名或者订单号） </h3>
    <el-divier></el-divier>
    <div>
      <el-input placeholder="请输入查询内容" v-model="nameOrId" class="input-with-select" @keyup.enter.native="onSubmit">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="用户名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="onSubmit"></el-button>
      </el-input>
      <div style="margin-top: 50px"></div>
      <el-divider content-position="center" v-if="visible"> 查询结果 </el-divider>
      <div style="margin-top: 10px"></div>
      <el-table
        v-if="visible"
        :data="tableData"
        height="500"
        style="width: 100%">
        <el-table-column
          prop="returnedDate"
          label="日期"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="realName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="id"
          label="订单号">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {getReturnsById, getReturnsByName} from "@/api/return";

  export default {
    data() {
      return {
        nameOrId: '',
        select: '1',
        tableData: [],
        visible: false,
      }
    },
    methods: {
      onSubmit: function () {
        this.tableData = [];
        this.visible = false;
        if(this.select === '1') {
          // 根据用户名进行选择
          getReturnsByName(this.nameOrId).then(response => {
            this.tableData = response.data
          }).then(() => {
            this.$message({
              type: "success",
              message: "OK!"
            })
            this.visible = true;
          })

        } else if(this.select === '2') {
          // 根据订单号选在
          getReturnsById(this.nameOrId).then(response => {
            this.tableData.push(response.data)
          }).then(() => {
            this.$message({
              type: "success",
              message: "OK!"
            })
            this.visible = true
          })
        }
      }
    }
  }
</script>
