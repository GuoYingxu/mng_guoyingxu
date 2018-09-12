import Vue from 'vue'
import { appRouter,otherRouter } from '../../router/routerConfig';

const app = {
  state:{
    currentPath:[{
      title:'首页',
      path:'',
      name:'home_index'
    }],
    currentPageName:'',
    menuList:[],
    routers:[otherRouter,...appRouter]
  },
  mutations:{
    UPDATE_MENULIST(state){
      let menuList = []
      appRouter.forEach((item,index)=>{
          menuList.push(item)
      })
      state.menuList = menuList
    },
    SET_CURRENTPATH(state, pathArr) {
      state.currentPath = pathArr;
    },
    SET_CURRENTPAGENAME (state, name) {
        state.currentPageName = name;
    },
  }
}

export default app