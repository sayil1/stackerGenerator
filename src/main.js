import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from '../src/pluggins/vuetify'

Vue.config.productionTip = false
Vue.use(Vuetify)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
