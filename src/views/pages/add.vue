<template>
    <div class="container">
        <h3>新增订单</h3>
        <el-form :model="order" label-width="80px">
            <el-form-item label="收件人">
                <el-input v-model="order.user" placeholder="收件人"></el-input>
            </el-form-item>
            <!--<el-form-item label="收件地址">-->
                <!--<el-input v-model="order.address" placeholder="收件地址"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="电话">-->
                <!--<el-input v-model="order.mobile" placeholder="电话"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="物品清单">
                <el-input v-model="order.good" placeholder="物品清单"></el-input>
            </el-form-item>
            <el-form-item label="快递单号">
                <el-input v-model="order.orderId" placeholder="快递单"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="order.remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addOrder">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  const uuidv4 = require('uuid/v4');
  export default {
    name: "add",
    data() {
      return {
        order: {
          uid: uuidv4(),
          user: '',
          address: '',
          mobile: '',
          good: '',
          remark: '',
          status: 0,
          orderId: '',
          beginTime: '',
          endTime: ''
        }
      }
    },
    methods: {
      addOrder() {
        this.$store.dispatch('ADD_ORDER', this.order).then(() => {
          this.$router.push('/list')
        })
      }
    }
  }
</script>
