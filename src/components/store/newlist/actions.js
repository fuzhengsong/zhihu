/**
 * Created by fuzhengsong on 2017/8/5.
 */
import * as types from './types';
import axios from 'axios';

export default {

  //计算实际日期和请求日期
  setRequestDate({commit}, data){
    let year = data.getFullYear();
    let month = data.getMonth();
    let day = data.getDate();
    let newDate = new Date(year, month, day - 1);
    let formDate = function (newDate) {
      let newYear = newDate.getFullYear();
      let newMonth = ('0' + (parseInt(newDate.getMonth()) + 1)).slice(-2);
      let newDay = ('0' + newDate.getDate()).slice(-2);
      return newYear + newMonth + newDay;
    };
    let newValue = {
      reqParam: formDate(data),
      date: newDate
    };
    commit(types.SETREQUESTDATE, newValue);
  },

  //请求最后一次的数据
  requestLastData({commit, state}){
    return new Promise((resolve, reject) => {
      axios.get('/api/news/latest').then(data => {
        let recommendInfo = data.data.top_stories;
        commit(types.ADD_RECOMMEND_DATA, recommendInfo);
        let newData = {
          date: 'today',
          Data: data.data.stories
        };
        if (state.lists && state.lists.length) {
          commit(types.REPLACE_LASTEST_DATA, newData);
        } else {
          commit(types.ADD_LASTEST_DATA, newData);
        }
        resolve()
      }).catch(err => {
        console.warn(err);
        reject()
      });
    })
  },

  //下拉加载更多的数据
  loadMoreData({commit, state, dispatch}, data){
    state.loading = true;
    axios.get('/api/news/before/' + state.date.reqParam).then(data => {
      let newData = {
        date: state.date.date,
        Data: data.data.stories
      };
      commit(types.ADD_BEFORE_DATA, newData);
      state.loading = false;
      //将下次请求的日期设置为前一天
      dispatch('setRequestDate', state.date.date);
    }).catch(() => {
      console.log('请求错误');
    })
  },

  //计算当前新闻也前后的id
  computedNewId({commit, state}, data){
    state.lists.forEach(function (item, index) {
      item.Data.forEach(function (list, ind) {
        let preId,
          nextId,
          currentId;
        if (list.id === data) {
          if (ind === 0) {
            if (index === 0) {
              preId = '';
            }else{
              preId = state.lists[index-1].Data[state.lists[index-1].Data.length-1].id;
            }
          }else{
            preId = item.Data[ind - 1].id;
          }
          if(ind === item.Data.length-1){
            if(index === state.lists.length-1){
              nextId = '';
            }else{
              nextId =  state.lists[index+1].Data[0].id;
            }
          }else{
            nextId = item.Data[ind + 1].id
          }
          currentId = data;
          commit(types.UPDATE_NEW_ID,{
            preId: preId,
            currentId: currentId,
            nextId: nextId
          })
        }
      })
    })
  },

  //更新当前头部日期信息的列表
  computeHeaderPosition({commit,state},data){
    let headers = [];
    data.forEach(function(item){
      let header;
      let position = item.getBoundingClientRect().top + window.pageYOffset || document.documentElement.scrollTop;
      let text = item.firstChild.firstChild.nodeValue;
      header = {
        'position' : position,
        'text' : text
      };
      headers.push(header);
    });
    commit(types.UPDATE_HEADER_INFO,headers)
  }
};
