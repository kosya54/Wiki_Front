import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import { store } from './store/store'

require('@/assets/main.scss')

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
