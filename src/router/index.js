import Vue from 'vue'
import Router from 'vue-router'
import UserLogin from '@/components/manage/UserLogin.vue'
import UserIndex from '@/components/home/UserIndex.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'UserIndex',
      component: UserIndex
    },
    {
      path: '/manage',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: UserLogin
    }
  ]

})
