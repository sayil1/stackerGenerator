import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/HelloWorld.vue'
import gen from '../components/generate_labels/generate.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'gen',
      component: gen
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
  ]
})