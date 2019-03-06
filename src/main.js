import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'amfe-flexible'
import './assets/stylus/reset.styl'
import { post, get, patch, put } from './http'
import Vconsole from 'vconsole'
var VueTouch = require('vue-touch')
Vue.config.productionTip = false
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-unused-vars
  let vConsole = new Vconsole()
}
Vue.use(VueTouch, { name: 'v-touch' })
// 定义全局变量
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$patch = patch
Vue.prototype.$put = put
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
