<template>
  <ul>
    <li
      v-for="(itm,index) in lists"
      @click="pushTo(itm,index)"
      class="zh-list"
    >
      <div class="zh-list-words">
        {{itm.title}}
      </div>
      <div class="zh-list-img">
        <img :src="itm.images[0]" alt="" class="img">
      </div>
    </li>
  </ul>
</template>

<script>
  import 'less/newsList.less';
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  export default{
    props: {
      lists: {
        type: Array,
        required: true
      }
    },
    computed:{
      ...mapGetters({
        newsId: 'getNewsId'
      })
    },
    methods: {
      ...mapActions({
        computedNewId: 'computedNewId'
      }),
      pushTo(item){
        this.computedNewId(item.id);
        this.$nextTick(() => {
          this.$router.push({
            name: 'newDetail',
            params: {id: item.id},
            query: {preId: this.newsId.preId, nextId: this.newsId.nextId}
          });
        })
      }
    }
  };
</script>

