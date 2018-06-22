import Vue from 'vue';
export default {
  GET_ORDERS: (state, data) => {
    state.orders = data
  },
  ADD_ORDER: (state, item) => {
   state.orders.push(item)
  },
  PATCH_ORDER: (state, item) => {
    let index = state.orders.findIndex((order) => {
      return item.uid === order.uid;
    });
    let init = state.orders[index];
    Vue.set(state.orders, index, { ...init, ...item });
  },
  GET_ORDER_DETAIL: (state, data) => {
    state.orderDetail = data
  },
  GET_ORDER_COUNT: (state, data) => {
    state.count = data
  }
}