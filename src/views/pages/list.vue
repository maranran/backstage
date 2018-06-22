<template>
    <div class="container">
        <h3>订单到哪儿了</h3>
        <order-filter @search="searchOrder"></order-filter>
        <el-table
                border
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="user"
                    label="姓名"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="good"
                    label="物品"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="备注"
            >
            </el-table-column>
            <el-table-column
                    prop="orderId"
                    label="快递单号"
            >
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="70"
            >
                <template slot-scope="scope">
                    {{ scope.row.status === 0 ? '待发货': scope.row.status === 1 ? '已发货': '已收货'}}
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="220"
            >
                <template slot-scope="scope">
                    <router-link :to="`/detail/${scope.row.objectId}`">
                        <el-button size="mini">查看</el-button>
                    </router-link>
                    <router-link :to="`/edit/${scope.row.objectId}`">
                        <el-button size="mini">编辑</el-button>
                    </router-link>
                    <el-button type="primary" size="mini" v-if="scope.row.status === 0"
                               @click="changeStatus(scope.row, 1)">发货
                    </el-button>
                    <el-button type="success" size="mini" v-if="scope.row.status === 1"
                               @click="changeStatus(scope.row, 2)">收货
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <p style="text-align: right">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="dataCount"
                    :current-page.sync="currentPage"
            >
            </el-pagination>
        </p>
    </div>
</template>

<script>
  var moment = require('moment');
  import OrderFilter from '../components/filter.vue';
  import { Cookie } from "src/utils";

  export default {
    name: "list",
    components: {
      OrderFilter
    },
    data() {
      return {
        limit: 10,
        currentPage: 1
      }
    },
    asyncData({store}) {
      return Promise.all([store.dispatch('GET_ORDERS', {}), store.dispatch('GET_ORDER_COUNT')])
    },
    computed: {
      tableData() {
        return this.$store.state.orders;
      },
      dataCount() {
        return this.$store.state.count;
      },
      skip() {
        return (this.currentPage - 1) * this.limit;
      }
    },
    watch: {
      currentPage() {
        this.searchOrder()
      }
    },
    methods: {
      changeStatus(row, status) {
        let current = moment().format('YYYY-MM-DD HH:mm:ss')
        let key = status === 1 ? 'beginTime' : 'endTime';
        let order = {status: status, [key]: current, uid: row.uid};
        this.$store.dispatch('PATCH_ORDER', {id: row.objectId, order})
      },
      searchOrder(filter) {
        let {limit, skip} = this;
        let where = {...filter}
        Object.keys(where).forEach((key) => {
          if (where[key] === '') {
            delete where[key]
          }
        });
        this.$store.dispatch('GET_ORDERS', {limit, skip, where})
      }
    }
  }
</script>

<style scoped>
    .el-button {
        margin-left: 5px;
    }
</style>