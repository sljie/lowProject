// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import EventBus from './js/event-bus'
import store from './store'

window.axios = axios // 网络请求
window.eBus = new EventBus() //事件总线
Vue.use(ElementUI)

import App from './App'
import router from './router'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(
  function (config) {
    console.log('请求前：'+config.url, config.params, config.data)
    return config
  }, function (error) {
    console.error(error)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    if (!response.data.success) {

      console.log("请求错误：",response.data);
    } else {
      console.log('返回:' + response.config.url + '\n',response.data)
    }
    return response.data
  }, function (error) {
    console.error('interceptors',error)
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
