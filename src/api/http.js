import baasConfig from './config'
const axios = require('axios');

const BaasApi = axios.create({
  baseURL: baasConfig.url,
  headers: {'Content-Type': 'application/json' }
});

const Leancloud = axios.create({
  baseURL: 'https://leancloud.cn/1.1/'
});

export { BaasApi, Leancloud }
