import { BaasApi, Leancloud } from './http'
import baasConfig from './config'
const axios = require('axios');
var urlencode = require('urlencode');
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
export function getLogistics(express, id) {
  return axios.get(`/api/logistics/${express}/${id}`)
}



export function addData(body) {
  return Leancloud.post('/classes/order', JSON.stringify(body));
}
export function getData(limit=10, skip=0, filter={}) {
  return Leancloud.get(`/classes/order?limit=${limit}&skip=${skip}&where=${encodeURIComponent(JSON.stringify(filter))}&order=status`);
}
export function getCount(filter={}) {
  return Leancloud.get(`/classes/order?count=1&limit=0&where=${encodeURIComponent(JSON.stringify(filter))}`);
}
export function getDetail(objectId) {
  return Leancloud.get(`/classes/order/${objectId}`);
}

export function patchData(objectId, body) {
  return Leancloud.put(`/classes/order/${objectId}`, JSON.stringify(body));
}


export function login({ username, password }) {
  return Leancloud.get(`/users?username=${username}&password=${password}`);
}