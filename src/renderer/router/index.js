import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage'),
      children: [
        {
          path: 'main-page',
          name: 'main-page',
          component: require('../components/LandingPage/MainPage.vue')
        },
          {
              path: 'login-page',
              name: 'login-page',
              component: require('../components/LandingPage/LoginPage.vue')
          }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
