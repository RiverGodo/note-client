import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from'nprogress'
import 'nprogress/nprogress.css'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const components = {
  layout: () => import('@/views/Layout'),
  index: () => import('@/views/index/index'),
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: components.layout,
      redirect:'/index',
      children:[
        {
          path:'index',
          meta:{
            title:'云笔记首页'
          },
          component:components.index
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to and from are both route objects
  Nprogress.start()
  next()
})

router.afterEach((to,from)=>{
  Nprogress.done() 
})

export default router