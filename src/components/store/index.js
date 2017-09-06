/**
 * Created by fuzhengsong on 2017/9/3.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import {default as newslist} from './newlist';
import {default as comment} from './comment';
import {default as themes} from './themes';

Vue.use(Vuex);
export default new Vuex.Store({
  modules:{
    newslist,
    comment,
    themes
  }
})
