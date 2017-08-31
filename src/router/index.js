import Vue from 'vue'
import Router from 'vue-router'
import * as components from '../components';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: {
        name: 'zhIndex'
      }
    },
    {
      path:'/',
      name: 'firstPage',
      component:components.FirstPage
    },
    {
      path: '/index',
      name: 'zhIndex',
      component: components.Index
    },
    {
      path: '/newDetail/:id',
      name: 'newDetail',
      component: components.newsDetail
    }
  ]
})
