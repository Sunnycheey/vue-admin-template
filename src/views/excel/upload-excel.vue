<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
  import UploadExcelComponent from '@/components/UploadExcel/index.vue'

  export default {
    name: 'UploadExcel',
    components: { UploadExcelComponent },
    data() {
      return {
        tableData: [],
        tableHeader: []
      }
    },
    methods: {
      beforeUpload(file) {
        const isLt1000M = file.size / 1024 / 1024 < 1024

        if (isLt1000M) {
          return true
        }

        this.$message({
          message: '请不要上传超过一个G的文件',
          type: 'warning'
        })
        return false
      },
      handleSuccess({ results, header }) {
        this.tableData = results
        this.tableHeader = header
        this.$message({
          type: "success",
          message: "OK"
        })
      }
    }
  }
</script>
