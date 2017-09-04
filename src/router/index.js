import Vue from 'vue'
import Router from 'vue-router'
import * as components from '../components';
Vue.use(Router);

export default new Router({
  mode:'history',
  scrollBehavior(to,from,savedPosition){
    if(to.name === 'zhIndex'){
      return{x: 0, y: to.params.position}
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
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
    },
    {
      path: '/newComments/:id',
      name: 'newComments',
      component: components.Comment
    }
  ]
})
