import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'  //maven-editor的样式文件
import './assets/iconfont/iconfont.css'  //引入阿里矢量图标

//创建一个axios实例并赋值在Vue的原型上，
//则所有组件都可访问这个axios实例
Vue.prototype.$http = axios.create({ 
  // baseURL: 'http://localhost:3000/'
  baseURL: process.env.VUE_APP_API_URL || 'http://118.24.100.4/api/' //根据服务器域名动态决定url
})
Vue.use(mavonEditor)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
