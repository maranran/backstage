import {
  getData,
  addData,
  patchData,
  getDetail,
  getCount
} from '../api';

export default {
  GET_ORDERS: ({ commit }, { limit=10, skip=0, where={} }) => {
    return getData(limit, skip, where).then(({ data }) => commit('GET_ORDERS', data.results))
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
  GET_ORDER_COUNT: ({ commit }, filter={} ) => {
    return getCount(filter).then(({ data }) => commit('GET_ORDER_COUNT', data.count))
  },
}