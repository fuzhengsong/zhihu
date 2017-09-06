/**
 * Created by fuzhengsong on 2017/8/6.
 */

import Vue from 'vue';
import newsList from './newsList.vue';
import zhFooter from './zhFooter.vue';
import themes from './themes.vue';

Vue.component('news-list',newsList);
Vue.component('zh-footer',zhFooter);
Vue.component('zh-themes',themes);
