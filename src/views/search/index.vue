<template>
  <div class="app-container">
    <el-input v-model="input" placeholder="请输入内容" class="input-with-select">
      <el-button slot="append" icon="el-icon-search" @click="onSubmit" />
    </el-input>
    <div style="height: 20px" />
    <el-table
      v-loading="listLoading"
      :data="searchedData"
      border
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="username"
        label="用户名"
      />
      <el-table-column
        align="center"
        prop="order_id"
        label="订单编号"
      />
      <el-empty slot="empty" description="数据为空" :image-size="200" />
    </el-table>
  </div>
</template>

<script>
import { getOrder } from '@/api/order'

export default {
  data() {
    return {
      input: '',
      searchedData: [],
      listLoading: false
    }
  },
  methods: {
    onSubmit() {
      this.listLoading = true
      getOrder(this.input).then(res => {
        if (res.message === 'success') {
          if (res.data.length > 0) {
            this.searchedData = res.data
          } else {
            this.$message('当前无搜索结果！')
          }
        } else {
          this.$message.error('搜索失败，请重试')
        }
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
