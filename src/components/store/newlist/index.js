/**
 * Created by fuzhengsong on 2017/8/5.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import actions from './actions';
Vue.use(Vuex);

const state = {
  date: {               //发送请求的日期和当前日期
    reqParam : '',
    date: new Date()
  },
  recommendData:[],    //轮播数据
  lists:[],           //渲染列表 按日期分
  loading:false,
  newsId:{
    preId:'',
    currentId:'',
    nextId:''
  },
  headers: []
};

const getters = {
  getNextDate: (state) => state.date,
  getRecommendInfo:(state) => state.recommendData,
  getLastestList:(state) => state.lists,
  getLoadingState:(state) => state.loading,
  getNewsId:(state) => state.newsId,
  getHeaderInfo:(state) => state.headers
};

const mutations = {
  //下一次需要发送的参数和显示日期
  [types.SETREQUESTDATE](state, data){
    state.date = Object.assign({},state.date,data);
  },

  //添加轮播图
  [types.ADD_RECOMMEND_DATA](state,data){
    state.recommendData = data;
  },

  //添加最新的数据
  [types.ADD_LASTEST_DATA](state,data){
    state.lists.push(data);
  },

  //替换最新的数据
  [types.REPLACE_LASTEST_DATA](state,data){
    state.lists.splice(0,1,data);
  },

  //添加之前的数据
  [types.ADD_BEFORE_DATA](state,data){
    state.lists.push(data);
  },

  //更新新闻id
  [types.UPDATE_NEW_ID](state,data){
    state.newsId = Object.assign({},state.newsId,data)
  },

  // 更新标题列表
  [types.UPDATE_HEADER_INFO](state,data){
    state.headers = data;
  }
};

export default{
  getters,
  actions,
  state,
  mutations
}
