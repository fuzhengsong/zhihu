/**
 * Created by fuzhengsong on 2017/8/31.
 */
export default class ScrollFixed{
  constructor(config){
    this.$$config = config;
    //获取元素开始固定位置与当前位置距离
    this.instance = config.parent.getBoundingClientRect().top;
    // 当前页面的滚动距离
    this.scrollY = window.pageYOffset;
  }

  trigger(){
    let _this = this;
    window.addEventListener('scroll',function(){
      let currentScroll = window.pageYOffset;
      if(currentScroll - _this.scrollY > _this.instance && _this.$$config.index >=1){
        _this.$$config.vm.isheadershow = true;
        _this.$$config.vm.currentTitle = _this.$$config.child;
        console.log(_this.$$config.child);
      }else {
        _this.$$config.vm.isheadershow = false;
      }
    })
  }
}
