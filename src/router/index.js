import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Label from '@/components/label'
import Login from '@/components/login'
import Events from '@/components/events'
import moduleManagement from '@/views/formManagement/moduleManagement'
import iconManagement from '@/views/formManagement/iconManagement'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/events',
          name: 'events',
          component: Events
        },
        {
          path: '/label',
          name: 'label',
          component: Label
        },
        {
          path: '/moduleManagement',
          name: 'moduleManagement',
          component: moduleManagement,
        },
        {
          path: '/iconManagement',
          name: 'iconManagement',
          component: iconManagement,
        },
      ]
    },
  ]
})
