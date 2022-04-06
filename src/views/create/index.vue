<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
      <el-form-item label="产品id" prop="id">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="产品名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="产品价格" prop="price">
        <el-input v-model="form.price" type="number" />
      </el-form-item>
      <el-form-item label="产品数量" prop="amount">
        <el-input v-model="form.amount" type="number" />
      </el-form-item>
      <el-form-item label="准入规则" prop="rule">
        <el-checkbox-group v-model="checkedRules" @change="handleCheckedRulesChange">
          <el-checkbox v-for="(rule,index) in rules" :key="index" :label="rule">{{ rule.name }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="起止时间" prop="date">
        <el-date-picker
          v-model="form.date"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="产品描述">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="2"
          placeholder="请输入产品描述"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="create">创建</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="确认信息" :visible.sync="dialogFormVisible">
      <el-descriptions title="产品信息" border column="2">
        <el-descriptions-item label="产品id">{{ form.id }}</el-descriptions-item>
        <el-descriptions-item label="产品名">{{ form.name }}</el-descriptions-item>
        <el-descriptions-item label="产品价格">{{ form.price }}</el-descriptions-item>
        <el-descriptions-item label="产品数量">{{ form.amount }}</el-descriptions-item>
        <el-descriptions-item label="起止时间">{{ getTime(form.date[0]) + ' 至 ' + getTime(form.date[0]) }}</el-descriptions-item>
        <el-descriptions-item label="准入规则">
          <el-checkbox v-for="rule in checkedRules" disabled checked>{{ rule.name }}</el-checkbox>
        </el-descriptions-item>
        <el-descriptions-item label="产品描述">{{ form.description }}</el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit(form)">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getRules } from '@/api/rule'
import { createProduct } from '@/api/create'

export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        amount: 0,
        price: 0,
        rule: '',
        date: '',
        description: ''
      },
      rules: [],
      checkedRules: [],
      formRules: {
        id: { required: true, message: '请输入产品id', trigger: 'blur' },
        name: { required: true, message: '请输入产品名称', trigger: 'blur' },
        price: { required: true, message: '请输入产品价格', trigger: 'blur' },
        amount: { required: true, message: '请输入产品数量', trigger: 'blur' },
        // rule: { required: true, message: '请至少选择一个准入规则', trigger: 'change', type: 'array' },
        date: { required: true, message: '请选择起止时间', trigger: 'change' }
      },
      isIndeterminate: true,
      checkAll: false,
      dialogFormVisible: false
    }
  },
  created() {
    this.fetchRules()
  },
  methods: {
    getTime(d) {
      const date = new Date(d)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return year + '年' + month + '月' + day + '日'
    },
    create() {
      console.log(this.form)
      this.$refs.form.validate(valid => {
        console.log(valid)
        if (valid) {
          this.dialogFormVisible = true
        }
      })
    },
    onSubmit() {
      var ruleStr = ''
      for (let i = 0; i < this.checkedRules.length; i++) {
        ruleStr += (this.checkedRules[i].id + ';')
      }
      const submitForm = {
        begin_time: this.form.date[0],
        description: this.form.description,
        end_time: this.form.date[1],
        id: this.form.id,
        name: this.form.name,
        total_num: this.form.amount,
        price: this.form.price,
        forbid_rule: ruleStr
      }
      console.log(submitForm)
      createProduct(submitForm).then(res => {
        if (res.message === 'success') {
          this.$message({
            message: '创建成功！',
            type: 'success'
          })
          this.$refs.form.resetFields()
        } else {
          this.$message.error('创建失败，请重试')
        }
      })
      this.dialogFormVisible = false
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handleCheckedRulesChange(val) {
      this.form.rule = val
    },
    fetchRules() {
      getRules().then(res => {
        if (res.message === 'success') {
          this.rules = res.data
        } else {
          this.$message.error('加载出错，请刷新！')
        }
      })
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

