/*
 * @Description: henggao_note
 * @version: v1.0.0
 * @Date: 2024-07-20 11:05:26
 * @LastEditors: henggao
 * @LastEditTime: 2024-07-28 22:28:51
 */
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import WebJob from '@/components/WebJob'
// import WebjobWork from '@/components/WebjobWork'


Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: HomePage
    },
    {
      path: '/webjob',
      name: 'WebJob',
      component: WebJob
    },
    // {
    //   path: '/WebjobWork',
    //   name: 'WebjobWork',
    //   component: WebjobWork
    // },


  ]
})
