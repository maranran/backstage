import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Add = () => import('../views/pages/add.vue');
const Login = () => import('../views/pages/login.vue');
const Edit = () => import('../views/pages/edit.vue');
const List = () => import('../views/pages/list.vue');
const Detail = () => import('../views/pages/detail.vue');
const Page404 = () => import('../views/pages/page404.vue');

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      {
        path: '/login',  component: Login
      },
      {
        path: '/list', component: List
      },
      {
        path: '/add', component: Add
      },
      {
        path: '/edit/:id', component: Edit
      },
      {
        path: '/detail/:id',  component: Detail
      },
      {
        path: '/',  redirect: '/list'
      },
      { path: '*',
        component: Page404,
      },
    ]
  })
}

