<template>
  <div id="detail">
    <mt-loadmore :top-method="loadTop"
                 :topPullText="topPull"
                 :topDropText="topDrop"
                 :maxDistance=50
                 :topDistance=40
                 ref="loadmore"
    >
      <div class="place-holder"></div>
      <div id="new-detail" v-if="detail&&detail.title">
        <div class="new-detail-recommend">
          <img class='swp-img' :src="detail.image" :alt="detail.title">
          <div class="swp-text">
            <p class="text">{{detail.title}}</p>
          </div>
          <div class="swp-cover"></div>
        </div>
        <div class="new-detail-body" v-html="detail.body"></div>
      </div>
      <div class="place-holder-bottom"></div>
    </mt-loadmore>
    <zh-footer
      :params="$route.query.nextId"
      :extra="story_extra"
    ></zh-footer>
  </div>
</template>

<script>
  import axios from 'axios';
  import {
    mapGetters,
    mapActions
  } from 'vuex';
  export default{
    data(){
      return {
        detail: {},
        story_extra: {},
        topDrop:''
      }
    },
    computed:{
      ...mapGetters({
        newsId: 'getNewsId'
      }),
      // 判断路由中是否有上一篇的id
      topPull(){
        let preid = this.$route.query.preId;
        if(!preid){
          this.topDrop = '已经是第一篇了';
          return '已经是第一篇了'
        }else{
          this.topDrop = '释放更新';
          return '载入上一篇'
        }

      }
    },
    created(){
    },
    methods: {
      ...mapActions({
        computedNewId: 'computedNewId'
      }),
      //上拉加载上一篇文章
      loadTop(){
        let preid = this.$route.query.preId;
        if(preid) {
          this.computedNewId(this.$route.query.preId);
          this.$nextTick(() => {
            this.$router.push({
              name: 'newDetail',
              params: {id: this.$route.query.preId},
              query: {preId: this.newsId.preId, nextId: this.newsId.nextId}
            });
          });
        }
        this.$refs.loadmore.onTopLoaded();
      },
     /* loadBottom(){
        let nextId = this.$route.query.nextId;
        if(nextId){
        this.computedNewId(this.$route.query.nextId);
          this.$nextTick(() =>{
            this.$router.push({
              name: 'newDetail',
              params:{id:this.$route.query.nextId},
              query: {preId: this.newsId.preId, nextId: this.newsId.nextId}
            })
          });
        }
        this.$refs.loadmore.onBottomLoaded();
      },*/
    },
    beforeRouteUpdate (to, from, next){
      var _this = this;
      let paramID,
        detail,
        story_extra;
      paramID = to.params.id;

      let p1 = new Promise(function (resolve, reject) {
        axios.get('/api/news/' + paramID).then(data => {
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = data.data.css[0];
          let firstChild = document.getElementsByTagName('head')[0].firstElementChild;
          document.getElementsByTagName('head')[0].insertBefore(link, firstChild);
          link.onload = function () {
            detail = data.data;
            _this.detail = Object.assign({}, _this.detail, detail);
            resolve()
          }
        }).catch(err => {
          reject()
        });
      });

      let p2 = new Promise(function (resolve, reject) {
        axios.get('/api/story-extra/' + paramID).then(data => {
          story_extra = data.data;
          _this.story_extra = Object.assign({}, _this.story_extra, story_extra);
          resolve()
        }).catch(err => {
          reject()
        });
      });
      Promise.all([p1, p2]).then(() => {
        next()
      });
    },

    beforeRouteEnter(to, from, next){
      let paramID,
        detail,
        story_extra;
      paramID = to.params.id;
      let p1 = new Promise(function (resolve, reject) {
        axios.get('/api/news/' + paramID).then(data => {
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = data.data.css[0];
          let firstChild = document.getElementsByTagName('head')[0].firstElementChild;
          document.getElementsByTagName('head')[0].insertBefore(link, firstChild);
          link.onload = function () {
            detail = data.data;
            resolve()
          }
        }).catch(err => {
          reject()
        });
      });

      let p2 = new Promise(function (resolve, reject) {
        axios.get('/api/story-extra/' + paramID).then(data => {
          story_extra = data.data;
          resolve()
        }).catch(err => {
          reject()
        });
      });
      Promise.all([p1, p2]).then(() => {
        next(vm => {
          vm.detail = detail;
          vm.story_extra = story_extra;
        })
      })
    }
  }
  ;
</script>
<style lang="less" rel="stylesheet/less">
  @import '../../assets/less/common';
  .place-holder-bottom{
    .px2rem(height,50);
  }
  .place-holder{
    .px2rem(height,50);
    .px2rem(margin-top,-50);
  }
  #detail {
    .mint-loadmore-top{
      position: absolute;
      left:0;
      top:0;
      z-index:100;
      width:100%;
      margin-top:0;
      .mint-loadmore-text{
        color:#fff;
      }
    }
   /* .mint-loadmore-bottom{
      position: absolute;
      left:0;
      bottom:0;
      width:100%;
      margin-bottom:0;
    }*/
  }
  .new-detail-recommend {
    position: absolute;
    overflow: hidden;
    left:0;
    top:0;
    width: 100%;
    .px2rem(height, 250);
    .swp-img {
      position: absolute;
      width: 100%;
      .px2rem(bottom, -75);
    }
    .swp-text {
      position: absolute;
      .px2rem(bottom, 25);
      .px2rem(padding, 0 15px);
      z-index: 100;
      .text {
        color: #fff;
        .px2rem(font-size, 20);
        .px2rem(line-height, 26);
        margin: 0 !important
      }
    }
    .swp-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: -webkit-linear-gradient(bottom, rgba(0, 0, 0, .4), rgba(0, 0, 0, .1), rgba(0, 0, 0, .4));
      z-index: 98;
    }
  }

</style>
