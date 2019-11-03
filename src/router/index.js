import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import gen from '../components/generate_labels/generate.vue'

Vue.use(VueRouter)

const routes = [
  
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
  // {
  //   path: '/home',
  //   name: 'home',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
   mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  routes
})


export default router
