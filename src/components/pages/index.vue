<template>
    <div id="zh-index">
      <zh-themes ref="zhThemes"></zh-themes>
      <div class="index-wrap" ref="zhIndex">
        <div class="index-cover" v-show="isThemesShow" @click="themesShow"></div>
        <div class="zh-header" :style="{background:bgc}">
          <i class="iconfont icon-category" @click="themesShow"></i>
          <h1 class="zh-hot-title" >今日热闻</h1>
        </div>
        <div class="zh-header" style="background-color:rgb(52, 152, 219);z-index:1000" v-show="currentTitle">
          <h1 class="zh-hot-title" >{{currentTitle}}</h1>
        </div>
        <div class="zh-swipe" >
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
        <mt-loadmore :top-method="loadTop" ref="loadmore" >
          <div class="zh-news-list">
            <ul class="lists"
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="300">
              <li v-for="item,index in lists">
                <div class="header-wrap" ref="fixedHeader" v-if="item && item.date!=='today'">
                  <div class="item-header">{{item.date | Date}}</div>
                </div>
                <news-list
                  :lists="item.Data">
                </news-list>
              </li>
            </ul>
          </div>
        </mt-loadmore>
      </div>

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
        vm: this,
        currentTitle: '',
        isheadershow: false,
        isThemesShow: false
      }
    },
    computed: {
      ...mapGetters({
        getNextDate: 'getNextDate',
        recommendInfo: 'getRecommendInfo',
        lists: 'getLastestList',
        loading: 'getLoadingState',
        newsId: 'getNewsId',
        headerInfo : 'getHeaderInfo'
      })
    },
    watch:{
      lists(){
        this.$nextTick(function(){
          if(this.$refs && this.$refs.fixedHeader){
            this.computeHeaderPosition(this.$refs.fixedHeader)
          }
        })
      }
    },
    methods: {
      ...mapActions({
        setRequestDate: 'setRequestDate',
        ajaxData: 'requestLastData',
//        loadTopData: 'loadTopData',
        loadMore: 'loadMoreData',
        computedNewId: 'computedNewId',
        computeHeaderPosition:'computeHeaderPosition'
      }),
      prevent(event){
        // 判断默认行为是否可以被禁用
        if (event.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!event.defaultPrevented) {
            event.preventDefault();
          }
        }
      },
      //主题的显示隐藏
      themesShow(){
        this.isThemesShow = !this.isThemesShow;
        if(!this.isThemesShow){
          this.$refs.zhThemes.$el.style.transform = 'translate(0,0)';
          this.$refs.zhIndex.style.transform = 'translate(0,0)';
//          document.documentElement.style.overflow='auto';
//          document.body.style.overflow='auto';
          document.removeEventListener('touchmove',this.prevent,{ passive: false });
        }else{
          this.$refs.zhThemes.$el.style.transform = 'translate(100%,0)';
          this.$refs.zhIndex.style.transform = 'translate(55%,0)';
//          document.documentElement.style.overflow='hidden';
//          document.body.style.overflow='hidden';
          document.addEventListener('touchmove',this.prevent,{ passive: false });
        }
      },
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
        this.$store.commit('RECORD_SCROLL_POSITION',0)
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
      let nextRequestData = this.$store.state.newslist.date.reqParam;
      if(!nextRequestData){
        let date = new Date();
        this.setRequestDate(date);
      }
      //头部背景变化 监听
      window.addEventListener('scroll', this.toggle(function () {
        let top = window.pageYOffset || document.documentElement.scrollTop;
        _this.bgc = `rgba(52, 152, 219, ${top / 223})`;
        if (_this.opa > 1) {
          _this.bgc = 'rgba(52, 152, 219, 1)';
        }
        // 头部文字的更新
        if(_this.headerInfo){
          let currentHeader,
          currentPosition = 0;
          _this.headerInfo.forEach(function(item){
            if(item.position < top && item.position > currentPosition){
              currentHeader = item.text;
              currentPosition = item.position;
            }
          });
          _this.currentTitle = currentHeader;
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
