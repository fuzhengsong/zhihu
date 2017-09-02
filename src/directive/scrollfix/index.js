/**
 * Created by fuzhengsong on 2017/9/2.
 */

import Vue from 'vue';
import ScrollFixed from './scrollfix'
Vue.directive('scroll-fix',{

  /*
   bind 中插入时需要setTimeout
   应该是没有加载完css只加载了dom就执行了指令，采用延时获取高度
   setTimeout(function(){
   let parent = el.parentElement;
   if(!parent){
   return
   }
   let height = getComputedStyle(parent,null).height;
   },0)*/

  // 插入父元素之后执行
  inserted: function(el,binding){
    let parent = el.parentElement;
    let child = el.firstChild.nodeValue;
    if(!parent){
      return
    }
    let scrollFixedInstance = el.__scrollfixed = new ScrollFixed(Object.assign({},binding.value,{
      fixedElement: el,
      'parent': parent,
      'child': child
    }));
    scrollFixedInstance.trigger();
  }
});
