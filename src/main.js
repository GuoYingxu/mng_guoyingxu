// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import App from './App'
import { router } from '@/router/index'
import 'iview/dist/styles/iview.css'
import store from './store'

Vue.config.productionTip = false
Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router:router,
  render: h => h(App),
  data:{
    currentPageName:''
  },
  mounted(){
    this.currentPageName = this.$route.name;
    this.$store.commit('UPDATE_MENULIST')
  }
})
