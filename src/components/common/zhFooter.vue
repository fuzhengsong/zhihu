<template>
  <div id="zh-footer">
    <div class="icon" @click="goBack">
      <i class="iconfont icon-back"></i>
    </div>
    <div class="icon" @click="nextNew">
      <i class="iconfont icon-moreunfold"></i>
    </div>
    <div class="icon">
      <i class="iconfont icon-zan1"></i>
      <!--<i class="iconfont icon-zan"></i>-->
      <span class="new_detail_pop">{{extra.popularity}}</span>
    </div>
    <div class="icon">
      <i class="iconfont icon-fenxiang"></i>
    </div>
    <div class="icon" @click="toComments">
      <i class="iconfont icon-liuyan"></i>
      <span class="news_detail_comment">{{extra.comments}}</span>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default{
    props: {
      params: {
        required: true,
      },
      extra:{
        required: true,
        type: Object
      }
    },
    computed: {
      ...mapGetters({
        newsId: 'getNewsId'
      })
    },
    methods: {
      ...mapActions({
        computedNewId: 'computedNewId'
      }),
      goBack(){
        this.$router.push({name:'zhIndex',params:{'position':this.$store.state.newslist.scrollPosition}});
      },
      nextNew(){
        //更新store中的id
        this.computedNewId(this.$route.query.nextId);

        // 计算出下一篇文章的id信息后 执行路由跳转 不然store中的id没有更新就跳转会出错
        this.$nextTick(() =>{
          this.$router.push({
            name: 'newDetail',
            params:{id: this.$route.query.nextId},
            query: {preId: this.newsId.preId, nextId: this.newsId.nextId}
          });
        })
      },
      toComments(){
        this.$router.push({
          name: 'newComments',
          params: {
            id: this.$route.params.id,
          },
          query:{
            comments: this.extra.comments,
            longComments: this.extra.long_comments,
            shortComments: this.extra.short_comments
          }
        })
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import '../../assets/less/common';

  #zh-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    .px2rem(height, 50);
    .px2rem(line-height, 50);
    .flexbox();
    background-color: #fff;
    .icon {
      .flex(1);
      position: relative;
      text-align: center;
      .iconfont {
        .px2rem(font-size, 24);
      }
    }
  }
  .news_detail_comment{
    display: block;
    position: absolute;
    .px2rem(top,10);
    .px2rem(left,35);
    background-color: rgb(52, 152, 219,);
    color:#fff;
    .px2rem(width,20);
    .px2rem(height,12);
    .px2rem(line-height,12);
    .px2rem(font-size,10);
    text-align: center;
  }
  .new_detail_pop{
    display: block;
    position: absolute;
    .px2rem(top,6);
    .px2rem(left,40);
    .px2rem(width,30);
    .px2rem(height,16);
    .px2rem(line-height,16);
  }
</style>
