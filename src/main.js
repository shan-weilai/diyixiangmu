// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 1.reset.css
import "./assets/css/reset.css"
//2.vuex  目录
import store from "./store"
//3.数据交互 安装  并配置代理



//4.filters
import "./filters"

// 5。公共组件
import "./components"

// 6.路由组件

// 7.stylus预处理器（先不用）

// 8.element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
