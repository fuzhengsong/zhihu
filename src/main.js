// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUi from 'mint-ui'
import store from './components/store';
import 'mint-ui/lib/style.css'
import './assets/font/iconfont.css'
import './filter';
import './components/common';
import './directive';

Vue.config.productionTip = false;
Vue.use(MintUi);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
