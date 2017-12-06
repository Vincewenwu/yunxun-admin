// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './assets/theme/theme-green/index.css'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import store from './store/'

Vue.prototype.imgService = 'http://yunxunimg.xuechenedu.com/'
Vue.prototype.uploadUrl = 'http://localhost:8080/yunxun_cms_web/'
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
