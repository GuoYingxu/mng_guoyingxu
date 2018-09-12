import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import image from './modules/image';
import team from './modules/team'
import album from './modules/album'
Vue.use(Vuex)

const store = new Vuex.Store({
  state:{

  },
  mutations:{},
  actions:{},
  modules:{ app,user,image,team,album}
})
export default store