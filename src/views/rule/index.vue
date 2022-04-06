<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="ruleData"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="规则名"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="object"
        label="面向对象">
      </el-table-column>
      <el-table-column
        align="center"
        prop="description"
        label="规则描述">
      </el-table-column>
      <el-empty slot="empty" description="数据为空" :image-size="200"></el-empty>
    </el-table>
  </div>
</template>

<script>
import { getRules } from "@/api/rule";

export default {
  data() {
    return {
      ruleData: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getRules().then(res => {
        this.ruleData = res.data
        this.listLoading = false
      })
    }
  }
}
</script>
