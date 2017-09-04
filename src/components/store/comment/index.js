/**
 * Created by fuzhengsong on 2017/9/3.
 */
import * as types from './types';
import actions from './actions';

const state = {
  comments:{
    longComments: [],
    shortComments: []
  }
};

const getters ={
  returnLongComments: state => state.comments.longComments.comments,
  returnShortComments: state => state.comments.shortComments.comments
};

const mutations ={
  [types.GET_LONG_COMMENTS](state,data){
    state.comments.longComments = data;
  },

  [types.GET_SHORT_COMMENTS](state,data){
    state.comments.shortComments = data;
  }
};
export default{
  actions,
  state,
  mutations,
  getters
}
