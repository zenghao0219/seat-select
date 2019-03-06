import Vue from 'vue'
import Router from 'vue-router'
import HallSeat from '@/pages/hallseat/HallSeat'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HallSeat',
      component: HallSeat
    }
  ]
})
