import { BaasApi, Leancloud } from './http'
import baasConfig from './config'
const axios = require('axios');

// export function getData() {
//   return BaasApi.get(`/tables/order?appId=${baasConfig.appId}`);
// }

// export function patchData(id, body) {
//   return BaasApi.patch(`/tables/order/${id}?appId=${baasConfig.appId}`, {
//     body
//   });
// }

// export function addData(body) {
//   return BaasApi.post(`/tables/order?appId=${baasConfig.appId}`, {
//     body
//   });
// }
// export function getDetail(uid) {
//   const query = JSON.stringify({uid})
//   return BaasApi.get(`/tables/order?appId=${baasConfig.appId}&query=${query}`);
// }
export function getLogistics(id) {
  return axios.get(`/api/logistics/${id}`)
}



export function addData(body) {
  return Leancloud.post('/order', JSON.stringify(body));
}
export function getData() {
  return Leancloud.get('/order');
}

export function getDetail(objectId) {
  return Leancloud.get(`/order/${objectId}`);
}

export function patchData(objectId, body) {
  return Leancloud.put(`/order/${objectId}`, JSON.stringify(body));
}