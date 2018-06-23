<template>
    <div class="container">
        <h3>编辑订单</h3>
        <el-form :model="order" label-width="80px">
            <el-form-item label="收件人">
                <el-input v-model="order.user" placeholder="收件人"></el-input>
            </el-form-item>
            <!--<el-form-item label="收件地址">-->
                <!--<el-input v-model="order.address" placeholder="收件地址"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="电话">-->
                <!--<el-input v-model="order.mobile" placeholder="收件地址"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="物品清单">
                <el-input v-model="order.good" placeholder="物品清单"></el-input>
            </el-form-item>
            <el-form-item label="快递公司">
                <el-select v-model="order.express" placeholder="快递公司">
                    <el-option label="暂无" value=""></el-option>
                    <el-option :label="item.label" :key="item.value" :value="item.value" v-for="item in expressCom"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="快递单号">
                <el-input v-model="order.orderId" placeholder="快递单"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="order.remark" placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="editOrder">编辑</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  const uuidv4 = require('uuid/v4');
  import { expressCom } from 'src/config';
  export default {
    name: "add",
    data() {
      return {
        oldOrder: {},
        expressCom: expressCom
      }
    },
    asyncData({ store, route }) {
      return store.dispatch('GET_ORDER_DETAIL', route.params.id)
    },
    computed: {
      order() {
        return this.$store.state.orderDetail;
      }
    },
    mounted() {
      this.oldOrder = { ...this.order }
    },
    methods: {
      diffObj(a, b) {
        let result = {}
        const keys = Object.keys(a)
        keys.length && keys.forEach((key) => {
          if(a[key] !== b[key]) {
            result[key] = b[key]
          }
        })
        return result
      },
      editOrder() {
        let order = this.diffObj(this.oldOrder, this.order);
        order.uid = this.order.uid;
        this.$store.dispatch('PATCH_ORDER', { id: this.order.objectId, order }).then(() => {
          this.$router.push('/list')
        })
      }
    }
  }
</script>
