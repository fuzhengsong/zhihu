/**
 * Created by fuzhengsong on 2017/8/2.
 */
//首屏图
export const FirstPage = resolve => require.ensure([], () => resolve(require('./pages/firstpage.vue')),'pages/FirstPage');

//首页
export const Index = resolve => require.ensure([], () => resolve(require('./pages/index.vue')),'./pages/Index');

//详情页
export const newsDetail = resolve => require.ensure([], () => resolve(require('./pages/newDetail.vue')),'./pages/newDetail');
