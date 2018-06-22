import baasConfig from './config'
const axios = require('axios');

const BaasApi = axios.create({
  baseURL: baasConfig.url,
 // headers: {'Cookie': 'COFFEE_TOKEN=5e2e1ad8-8112-436f-851a-bb8291db4766'}
  headers: {'Content-Type': 'application/json' }
});

const Leancloud = axios.create({
  baseURL: 'https://leancloud.cn/1.1/classes',
  headers: {'content-type': 'application/json', 'x-avoscloud-application-id': 'EH7ManYMmWabNvVqdhcbR80v-gzGzoHsz', 'x-avoscloud-application-key': 'rvFPtDK5IprxJ7rf83Oy51Jz' }
});

export { BaasApi, Leancloud }
