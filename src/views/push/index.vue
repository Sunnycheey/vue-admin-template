<template>
  <div class="app-container">
    <el-input v-model="input" placeholder="请输入单号"></el-input>
    <div style="margin-top: 20px;"></div>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button @click="onCancel">取消</el-button>
    <el-dialog
      title="用户未录入"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <span>录入用户信息</span>
      <div style="margin: 20px"></div>
      <el-form label-position="left" label-width="80px" :model="user">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="用户姓名">
              <el-input v-model="user.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="所属用户">
              <el-select v-model="user.realName">
                <el-option
                v-for="item in users"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="用户地址">
          <el-input v-model="user.address"></el-input>
        </el-form-item>
        <el-form-item label="用户电话">
          <el-input v-model="user.phoneNumber"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="onFormCancel">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: '',
        dialogVisible: false,
        user: {
          realName: '',
          userName: '',
          phoneNumber: '',
          address: '',
          id: '',
          number: '',
        },
        users: [
          {
            value: 'name',
            label: 'name'
          }
        ]
      }
    },
    methods: {
      setNull: function(user) {
        for(const prop in user) {
          user[prop] = ''
        }
      },
      isEmpty: function(user) {
        // 判断是否为空
        return !(user.hasOwnProperty('id') && user['id'] !== '');
      },
      onSubmit: function() {
        // 新数据注入到this.user中
        if(this.isEmpty(this.user)) {
          this.dialogVisible = true;
        }
      },
      onCancel: function () {
        // clear the input
        this.input = ''
      },
      onFormCancel: function() {
        this.setNull(this.user)
        this.dialogVisible = false;
      },
      handleClose: function() {

      }
    }
  }
</script>
