<template>
  <div id="themes">
    <div class="themes-header">
      <div class="user-avatar">
        <img src="../../assets/images/avatar.jpg" alt="usravatar" class="img">
      </div>
      <div class="name">帅气逼人的壁虎</div>
    </div>
    <div class="themes-icons">
      <div class="collect icon">
        <i class="iconfont icon-shoucang"></i>
        <p class="name">收藏</p>
      </div>
      <div class="message icon">
        <i class="iconfont icon-xiaoxi"></i>
        <p  class="name">消息</p>
      </div>
      <div class="settings icon">
        <i class="iconfont icon-shezhi"></i>
        <p  class="name">设置</p>
      </div>
    </div>
    <div class="themes-lists" ref="themesLists">
      <div class="content">
        <div class="indexPage list">
          <i class="iconfont icon-shouyexian"></i>
          <span class="name">首页</span>
          <i class="iconfont icon-jiantou"></i>
        </div>
        <ul>
          <li class="list" v-for="item in themesList">
            <p class="name">{{item.name}}</p>
            <div class="icon">
              <i class="iconfont icon-iconfont707"></i>
              <i class="iconfont icon-jiantou" v-if="false"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="themes-footer" ref="themesFoot">
      <div class="complete">
        <i class="iconfont icon-xiazai"></i>
        <span class="name">完成</span>
      </div>
      <div class="night">
        <i class="iconfont icon-yejianmoshi"></i>
        <span class="name">夜间</span>
      </div>
    </div>
  </div>
</template>

<script>
  import 'less/themes.less';
  import axios from 'axios';
  import BScroll from 'better-scroll';
  export default{
    data(){
      return{
        themesList: []
      }
    },

    created(){
      axios.get('/api/themes').then(data =>{
        this.themesList = data.data.others;
        this.$nextTick(() =>{
          let scroll = new BScroll(this.$refs.themesLists,{
            scrollY: true
          })
        });
      }).catch(err =>{

      });

    },
    mounted(){

    }
  };
</script>
