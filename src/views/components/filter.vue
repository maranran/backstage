<template>
   <el-form :inline="true" :model="filter" class="demo-form-inline">
    <el-form-item label="收件人">
        <el-input v-model="filter.user" placeholder="收件人"></el-input>
    </el-form-item>
    <el-form-item label="状态">
        <el-select v-model="filter.status" placeholder="发货状态">
            <el-option label="未发货" value="0"></el-option>
            <el-option label="已发货" value="1"></el-option>
            <el-option label="已收货" value="2"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button><el-button type="primary">新建订单</el-button>
    </el-form-item>
</el-form>
</template>

<script>
  export default {
    name: "order-filter",
    data() {
      return {
        filter: {
          user: '',
          status: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$emit('search', this.filter)
      }
    }
  }
</script>

<style scoped>

</style>