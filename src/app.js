import Vue from 'vue'
import App from './app.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

export function createApp() {
  const store = createStore()
  const router = createRouter()
  sync(store, router)
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return { app, router, store }
}
