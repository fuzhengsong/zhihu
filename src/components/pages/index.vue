<template>
  <div id="zh-index">
    <div class="zh-header" :style="{background:bgc}">
      <i class="iconfont icon-category"></i>
      <h1 class="zh-hot-title">今日热闻</h1>
    </div>
    <div class="zh-swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in recommendInfo" :key="item.id">
          <img class='swp-img' :src="item.image" :alt="item.title">
          <div class="swp-text" @click="pushTo(item.id)">
            <p class="text">{{item.title}}</p>
          </div>
          <div class="swp-cover" @click="pushTo(item.id)"></div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <div class="zh-news-list">
        <ul class="lists"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="300">
          <li v-for="item in lists">
            <div class="item-header" v-if="item && item.date!=='today' ">
              {{item.date | Date}}
            </div>
            <news-list
              :lists="item.Data">
            </news-list>
          </li>
        </ul>
      </div>
    </mt-loadmore>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios';
  import 'less/index.less';
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  export default{
    data(){
      return {
        bgc: '',
        articleId: [],
      }
    },
    computed: {
      ...mapGetters({
        getNextDate: 'getNextDate',
        recommendInfo: 'getRecommendInfo',
        lists: 'getLastestList',
        loading: 'getLoadingState',
        newsId: 'getNewsId'
      })
    },
    methods: {
      ...mapActions({
        setRequestDate: 'setRequestDate',
        ajaxData: 'requestLastData',
        loadTopData: 'loadTopData',
        loadMore: 'loadMoreData',
        computedNewId: 'computedNewId'
      }),
      // 节流阀函数
      toggle(func, delay){
        var timeout,
          context,
          args;

        //第一次触发
        var startTime = Date.parse(new Date());
        return function () {
          let curTime = Date.parse(new Date());
          let remaining = delay - (curTime - startTime);
          context = this;
          args = arguments;

          //清除之前的延迟
          clearTimeout(timeout);
          if (remaining <= 0) {
            func.apply(context, args);
            startTime = Date.parse(new Date());
          } else {
            timeout = setTimeout(func, remaining);
          }
        }
      },

      //轮播跳转到详情页
      pushTo(id){
        this.computedNewId(id);
        this.$router.push({
          name: 'newDetail',
          params: {id:id},
          query: {preId: this.newsId.preId, nextId: this.newsId.nextId}
        });
      },

      //下拉更新
      loadTop(){
        this.ajaxData().then(() =>{
          this.$refs.loadmore.onTopLoaded()
        },() =>{

        })
      }

    },
    created(){
      this.ajaxData();
      let _this = this;
      let date = new Date();
      this.setRequestDate(date);
      //头部背景变化 监听
      window.addEventListener('scroll', this.toggle(function () {
        let top = document.body.scrollTop;
        _this.bgc = `rgba(52, 152, 219, ${top / 223})`;
        if (_this.opa > 1) {
          _this.bgc = 'rgba(52, 152, 219, 1)';
        }
      }, 0))
    }
  };
</script>
<style scpoed>
  p {
    margin: 0 !important;
  }
</style>
