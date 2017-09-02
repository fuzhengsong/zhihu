<template>
  <div id="new-detail" v-if="detail&&detail.title">
    <div class="new-detail-recommend">
      <img class='swp-img' :src="detail.image" :alt="detail.title">
      <div class="swp-text">
        <p class="text">{{detail.title}}</p>
      </div>
      <div class="swp-cover"></div>
    </div>
    <div class="new-detail-body" v-html="detail.body"></div>
    <zh-footer
      :params="$route.query.nextId"
      :extra="story_extra"
    ></zh-footer>
  </div>
</template>

<script>
  import axios from 'axios';
  export default{
    data(){
      return {
        detail: {},
        story_extra: {}
      }
    },
    created(){
//      this.ajaxData();
    },
//    watch: {
//      '$route'(to, from){
////        this.ajaxData()
//      }
//    },
    methods: {
//      ajaxData(){
//        let paramID;
//        paramID = this.$route.params.id;
//        axios.get('./api/news/' + paramID).then(data => {
//          this.includeLinkStyle(data.data.css[0], data);
//        }).catch(err =>{
//
//        });
//        axios.get('/api/story-extra/'+paramID).then(data =>{
//          this.story_extra = data.data;
//        }).catch(err =>{
//
//        })
//      },
//
//      //动态添加css
//      includeLinkStyle: function (url, data) {
//        var _this = this;
//        var link = document.createElement('link');
//        link.rel = 'stylesheet';
//        link.type = 'text/css';
//        link.href = url;
//        let firstChild = document.getElementsByTagName('head')[0].firstElementChild;
//        document.getElementsByTagName('head')[0].insertBefore(link, firstChild);
//        link.onload = function () {
//          _this.detail = data.data;
//        }
//      }
    },
    beforeRouteUpdate (to,from,next){
      var _this = this;
      let paramID,
        detail,
        story_extra;
      paramID = to.params.id;
      let p1 = new Promise(function (resolve, reject) {
        axios.get('./api/news/' + paramID).then(data => {
          var link = document.createElement('link');
          link.rel = 'stylesheet';
          link.type = 'text/css';
          link.href = data.data.css[0];
          let firstChild = document.getElementsByTagName('head')[0].firstElementChild;
          document.getElementsByTagName('head')[0].insertBefore(link, firstChild);
          link.onload = function () {
            detail = data.data;
            _this.detail = Object.assign({},_this.detail,detail);
            resolve()
          }
        }).catch(err => {
          reject()
        });
      });

      let p2 = new Promise(function (resolve,reject) {
        axios.get('/api/story-extra/' + paramID).then(data => {
          story_extra = data.data;
          _this.story_extra =Object.assign({},_this.story_extra,story_extra);
          resolve()
        }).catch(err => {
          reject()
        });
      });
      Promise.all([p1,p2]).then(()=> {
        next()
      });
    },

    beforeRouteEnter(to, from, next){
      let paramID,
        detail,
        story_extra;
      paramID = to.params.id;
      let p1 = new Promise(function (resolve, reject) {
        axios.get('./api/news/' + paramID).then(data => {
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

      let p2 = new Promise(function (resolve,reject) {
        axios.get('/api/story-extra/' + paramID).then(data => {
          story_extra = data.data;
          resolve()
        }).catch(err => {
          reject()
        });
      });
      Promise.all([p1,p2]).then(()=>{
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

  .new-detail-recommend {
    position: absolute;
    overflow: hidden;
    width: 100%;
    .px2rem(height, 200);
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
