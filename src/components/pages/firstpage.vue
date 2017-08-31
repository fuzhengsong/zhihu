<template>
    <div id="firstpage">
      <img class='bgImg' src="../../../src/assets/images/background-girl.jpg" alt="">
      <div class="zh-desc">
        <p class="wrods">每天三次，每次七分钟</p>
      </div>
    </div>
</template>

<script>
  import 'less/firstpage.less';
    export default{
      data() {
        return {

        }
      },
      created() {
        let _this = this;
        setTimeout(function () {
          _this.$router.push({name: 'zhIndex'})
        },3000);
      }
    };
</script>

