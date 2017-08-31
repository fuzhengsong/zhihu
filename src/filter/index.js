/**
 * Created by fuzhengsong on 2017/8/5.
 */
import Vue from 'vue';

Vue.filter('Date', function (newDate) {
  var arr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
  let newMonth = ('0' + (parseInt(newDate.getMonth()) + 1)).slice(-2);
  let newDay = ('0' + newDate.getDate()).slice(-2);
  let weekDay = arr[newDate.getDay()];
  return  newMonth + '月' + newDay + '日'+'   '+weekDay;
});
