<template>
  <div class="app-container">
    <h3 style="text-align: center"> 更新用户信息 </h3>
    <el-divider></el-divider>
    <div style="margin-top: 20px;"></div>
    <el-form label-position="left" label-width="80px" :model="customer">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-form-item label="用户姓名">
            <el-select v-model="customer.realName" filterable @change="onSelectChange" @visible-change="onVisibleChange">
              <el-option
                v-for="item in customers"
                :key="item.realName"
                :label="item.realName"
                :value="item.realName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="特殊用户">
            <el-select v-model="customer.specialCustomer" filterable>
              <el-option
                v-for="item in optionItems"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="用户号码">
        <el-input v-model="customer.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="用户框号">
        <el-input v-model="customer.positionalNumber"></el-input>
      </el-form-item>
      <el-form-item label="用户地址">
        <el-input v-model="customer.address" @keyup.enter.native="onFormConfirm"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onFormCancel">取 消</el-button>
      <el-button type="primary" @click="onFormConfirm">确 定</el-button>
    </span>
  </div>
</template>

<script>
  import {getCustomers, setCustomers} from "@/api/customer"
  export default {
    data() {
      return {
        customer: {
          phoneNumber: '',
          positionalNumber: '',
          address: '',
          realName: '',
          specialCustomer: false,
        },
        optionItems: [
          {
            label: '否',
            value: false
          },
          {
            label: '是',
            value: true
          }
        ],
        customers: []
      }
    },
    created() {
    },
    methods: {
      onFormConfirm: function () {
        setCustomers(this.customer).then(response => {
          this.$message({
            type: 'success',
            message: 'OK!'
          })
        })
      },
      onFormCancel: function () {
        for (let data in this.data) {
          for(const prop in data) {
            data[prop] = ''
          }
        }
      },
      onSelectChange: function(selected) {
        console.log(selected)
        let idx = this.customers.map((e)=> {return e.realName}).indexOf(selected)
        this.customer = this.customers[idx]
      },
      setData: function() {
        getCustomers().then(response => {
          this.customers = response.data
        })
      },
      onVisibleChange: function (appear) {
        if(appear === true) {
          this.setData()
        }

      }
    }
  }
</script>
