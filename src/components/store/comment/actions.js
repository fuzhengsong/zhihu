/**
 * Created by fuzhengsong on 2017/9/4.
 */
import * as types from './types';
import axios from 'axios';

export default{
  //分别获取 长评论和短评论
  getCommentInfo({commit,state},data){
    axios.get('/api/story/'+data+'/long-comments').then(data =>{
      commit(types.GET_LONG_COMMENTS,data.data);
    }).catch(err =>{

    });

    axios.get('/api/story/'+data+'/short-comments').then(data =>{
      commit(types.GET_SHORT_COMMENTS,data.data);
    }).catch(err =>{

    })
  }
}
