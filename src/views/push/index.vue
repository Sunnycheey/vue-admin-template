<template>
  <div class="app-container">
    <el-input v-model="id" placeholder="请输入单号"></el-input>
    <div style="margin-top: 20px;"></div>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button @click="onCancel">取消</el-button>
    <el-dialog
      title="用户未录入"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <span>录入匹配信息</span>
      <div style="margin: 20px"></div>
      <el-form label-position="left" label-width="80px" :model="mapper">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form-item label="用户姓名">
              <el-input v-model="mapper.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="所属用户">
              <el-select v-model="mapper.realName" filterable>
                <el-option
                v-for="item in customers"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            或者
            <el-button type="text" @click="createCustomer">新建用户</el-button>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="onFormCancel">取 消</el-button>
    <el-button type="primary" @click="onDialogConfirm">确 定</el-button>
  </span>
    </el-dialog>
    <el-dialog
    title="新建用户"
    :visible.sync="innerDialogVisible"
    width="40%"
    :before-close="handleInnerClose">
    <span>用户信息</span>
    <div style="margin: 20px"></div>
    <el-form label-position="left" label-width="80px" :model="customer">
      <el-form-item label="用户姓名">
        <el-input v-model="customer.realName"></el-input>
      </el-form-item>
      <el-form-item label="用户号码">
        <el-input v-model="customer.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="用户框号">
        <el-input v-model="customer.positionalNumber"></el-input>
      </el-form-item>
      <el-form-item label="用户地址">
        <el-input v-model="customer.address"></el-input>
      </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="onInnerFormCancel">取 消</el-button>
    <el-button type="primary" @click="onInnerDialogConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getCustomers, setCustomers, getCustomersByName} from "@/api/customer";
  import {getItem} from "@/api/item";
  import {setMapper} from "@/api/mapper";

  export default {
    data() {
      return {
        id: '',
        dialogVisible: false,
        customer: {
          address: '',
          phoneNumber: '',
          realName: '',
          positionalNumber: ''
        },
        mapper: {
          name: '',
          realName: '',
        },
        // label, value
        customers: [],
        value: '',
        item: {},
        innerDialogVisible: false
      }
    },
    methods: {
      fetchSingleCustomer: function(id) {
        getItem(id).then(response => {
          this.item = response.data
          this.mapper.name = this.item.customerName
          // promise链式调用
          return this.mapper.name}).then(name => {
          getCustomersByName(name).then(response => {
            if(!response.data) {
              this.dialogVisible = true;
              console.log('dialog visible is : ' + this.dialogVisible)
              this.fetchCustomers();
              return null
            } else {
              return response.data;
            }
          }).then(data => {
            if(data === null) {
              // do nothing
            } else {
              this.$message({
                type: "success",
                message: `地址：${data.address}，名字：${data.realName}，框号：${data.positionalNumber}`
              })
            }
          })
        })
      },
      fetchCustomers: function() {
        getCustomers().then(response => {
          console.log(response.data)
          for(const data of response.data) {
            console.log(data)
            let tmp = {label: data.realName, value: data.realName}
            if(this.customers.map(e => {return e.label}).indexOf(tmp.label) === -1) {
              this.customers.push(tmp)
            }
          }
        })
      },

      setNull: function(user) {
        for(const prop in user) {
          user[prop] = ''
        }
      },
      onSubmit: async function() {
        await this.fetchSingleCustomer(this.id)
        console.log(this.customer)
      },
      onCancel: function () {
        // clear the input
        this.input = ''
      },
      onFormCancel: function() {
        this.setNull(this.user)
        this.dialogVisible = false;
      },
      onInnerFormCancel: function() {
        this.setNull(this.user)
        this.innerDialogVisible = false;
      },
      handleClose: function() {
        this.dialogVisible = false;
      },
      createCustomer: function() {
        this.innerDialogVisible = true;
      },
      handleInnerClose: function() {
        this.innerDialogVisible = false;
        this.dialogVisible = true;
      },
      onDialogConfirm: function() {
        setMapper(this.mapper).then(response => {
          console.log(response)
        })
        this.dialogVisible = false;
      },
      onInnerDialogConfirm: function () {
        setCustomers(this.customer).then(response => {
          this.fetchCustomers();
          this.innerDialogVisible = false;
          console.log(response)
        })
      }
    }
  }
</script>
