import baasConfig from './config'
const axios = require('axios');

const BaasApi = axios.create({
  baseURL: baasConfig.url,
 // headers: {'Cookie': 'COFFEE_TOKEN=5e2e1ad8-8112-436f-851a-bb8291db4766'}
  headers: {'Content-Type': 'application/json' }
});

const Leancloud = axios.create({
  baseURL: 'https://leancloud.cn/1.1/'
});

export { BaasApi, Leancloud }
