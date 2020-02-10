import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Label from '@/components/label'
import Login from '@/components/login'
import Events from '@/components/events'
import moduleManagement from '@/views/formManagement/moduleManagement'
import iconManagement from '@/views/formManagement/iconManagement'
import monacoeditor from '@/views/monacoeditor'
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
      redirect: 'login',
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
          path: '/monacoeditor',
          name: 'monacoeditor',
          component: monacoeditor,
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
