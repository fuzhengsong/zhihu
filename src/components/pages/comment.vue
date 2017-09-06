<template>
  <div id="comment">
    <header class="comment-header">
      {{comments}}&nbsp;条点评
    </header>
    <div class="long-comment comments" v-if="longCommentsList && longCommentsList.length>0">
      <div class="title">
        {{longComments}}&nbsp;条长评
      </div>
      <ul class="long-comment-lists">
        <li
          v-for="list in longCommentsList"
          class="comment-list">
          <div class="user-avatar">
            <img :src="list.avatar" :alt="list.author" class="img">
          </div>
          <div class="commerce-content">
            <div class="name">{{list.author}}</div>
            <div class="text">{{list.content}}</div>
            <div class="time">{{list.time | formatDate('MM-dd hh:mm')}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="short-comment comments" ref="shotComment" v-if="shortCommentsList && shortCommentsList.length > 0">
      <div class="title" @click="showShortComments">
        <div class="title-left">
          {{shortComments}}&nbsp;条短评
        </div>
        <div class="title-right">
          <i class="iconfont icon-jiantou-down" v-show="!isshortcommentshow"></i>
          <i class="iconfont icon-jiantou2-up" v-show="isshortcommentshow"></i>
        </div>
      </div>
      <ul v-show="isshortcommentshow">
        <li
           v-for="list in shortCommentsList"
           class="comment-list"
        >
          <div class="user-avatar">
            <img :src="list.avatar" :alt="list.author" class="img">
          </div>
          <div class="commerce-content">
            <div class="name">{{list.author}}</div>
            <div class="text">{{list.content}}</div>
            <div class="time">{{list.time | formatDate('MM-dd hh:mm')}}</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="footer-wrap">
      <footer class="comment-footer">
        <div class="footer-left" @click="$router.go(-1)">
          <i class="iconfont icon-back"></i>
        </div>
        <div class="footer-right">
          写点评
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  import 'less/comment.less';
  import {
    mapActions,
    mapGetters
  } from 'vuex';

  export default{
    data(){
      return{
        comments: this.$route.query.comments,
        longComments:  this.$route.query.longComments,
        shortComments:  this.$route.query.shortComments,
        isshortcommentshow: false
      }
    },
    methods: {
      ...mapActions({
        getCommentInfo : 'getCommentInfo'
      }),
      showShortComments(){
        this.isshortcommentshow = !this.isshortcommentshow;
        let el = this.$refs.shotComment;
        let scollpos = window.pageYOffset || document.documentElement.scrollTop;
        let pos = el.getBoundingClientRect().top+scollpos;
        this.$nextTick(() =>{
          window.scrollTo(0,pos);
        });

      }
    },
    computed: {
      ...mapGetters({
        longCommentsList: 'returnLongComments',
        shortCommentsList: 'returnShortComments'
      })
    },
    created(){
      let id = this.$route.params.id;
      if(id){
        this.getCommentInfo(id);
      }
    }
  };
</script>
