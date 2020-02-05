import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import DevProjects from '@/components/projects/dev'
import OpsProjects from '@/components/projects/ops'
import TestProjects from '@/components/projects/test'
import ProjectDetail from '@/components/projects/projectDetail'
import Notice from '@/components/notice'
import Label from '@/components/label'
import Events from '@/components/events'

Vue.use(Router)

export default new Router({
  routes: [
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
        // {
        //   path: '/dev/projects',
        //   name: 'devProjects',
        //   component: DevProjects
        // },
        // , {
        //   path: '/ops/projects',
        //   name: 'opsProjects',
        //   component: OpsProjects
        // }, {
        //   path: '/test/projects',
        //   name: 'testProjects',
        //   component: TestProjects
        // }, {
        //   path: '/project/detail',
        //   name: 'projectDetail',
        //   component: ProjectDetail
        // },
         {
          path: '/notice',
          name: 'notice',
          component: Notice
        },
        
        
      ]
    }
  ]
})
