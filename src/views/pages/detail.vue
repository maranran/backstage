<template>
    <div class="container detail">
        <h3>订单详情</h3>
        <p>
            <span>收件人：</span><span>{{ order.user }}</span>
        </p>
        <!--<p>-->
            <!--<span>收件地址：</span><span>{{ order.address }}</span>-->
        <!--</p>-->
        <p>
            <span>物品清单：</span><span>{{ order.good }}</span>
        </p>
        <p>
            <span>备注：</span><span>{{ order.remark }}</span>
        </p>
        <p>
            <span>发货日期：</span><span>{{ order.beginTime }}</span>
        </p>
        <p>
            <span>发货状态：</span><span>{{ order.status === 0 ? '待发货': order.status === 1 ? '已发货': '已收货' }}</span>
        </p>
        <p>
            <span>收货日期：</span><span>{{ order.endTime }}</span>
        </p>
        <p>
            <span>快递公司：</span><span>{{ getExpressName(order.express) }}</span>
        </p>
        <p>
            <span>快递单号：</span><span>{{ order.orderId }}</span>
        </p>
        <div v-if="order.orderId">
            <h4>物流信息：</h4>
            <p v-for="item in logisticsInfo">
                <span class="time">{{ parseTime(item.time) }}</span><span>{{ item.desc }}</span>
            </p>
        </div>
    </div>
</template>

<script>
  import { getLogistics } from 'src/api'
  import { getExpressName } from "../../utils";

  var moment = require('moment');
  export default {
    name: "add",
    data() {
      return {
        logisticsInfo: []
      }
    },
    asyncData({ store, route}) {
      return store.dispatch('GET_ORDER_DETAIL', route.params.id)
    },
    computed: {
      order() {
        return this.$store.state.orderDetail;
      }
    },
    mounted() {
      getLogistics(this.order.express, this.order.orderId).then(({ data }) => {
        this.logisticsInfo = data.data.info.context
      })
    },
    methods: {
      parseTime(time) {
        return moment(new Date(+time*1000)).format('YYYY-MM-DD HH:mm:ss');
      },
      setLogisticsInfo(data) {
        this.logisticsInfo = data.info.context
      },
      getExpressName
    }
  }
</script>
<style scoped>
    .detail span:first-child{
        display: inline-block;
        width: 150px;
        text-align: right;
    }
    .detail span:last-child{
        display: inline-block;
        text-align: left;
        margin-left: 10px;
    }
    .detail span.time {
        width: 175px;
    }
</style>
