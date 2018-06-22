import {
  getData,
  addData,
  patchData,
  getDetail
} from '../api';

export default {
  GET_ORDERS: ({ commit }) => {
    return getData().then(({ data }) => commit('GET_ORDERS', data.results))
  },
  ADD_ORDER: ({ commit }, order) => {
    return addData(order).then(({ data }) => commit('ADD_ORDER', data))
  },
  PATCH_ORDER: ({ commit }, { id, order }) => {
    return patchData(id, order).then(() => commit('PATCH_ORDER', order))
  },
  GET_ORDER_DETAIL: ({ commit }, id) => {
    return getDetail(id).then(({ data }) => commit('GET_ORDER_DETAIL', data))
  },
}