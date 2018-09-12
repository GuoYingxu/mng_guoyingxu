import Vue from 'vue'
import Router from 'vue-router'
import {routers} from './routerConfig'
import iView from 'iview'
import Cookies from 'js-cookie'
import Util from '../libs/util';
import {Config} from '../config'
import store from '../store'
const AppConfig = Config[process.env.NODE_ENV]

Vue.use(Router)
const routeConfig = {
  mode: 'history',
  routes: routers
}
export const router =  new Router(routeConfig)
router.beforeEach(async (to,from,next) =>{
  iView.LoadingBar.start()
  Util.title(to.meta.title,router.app)
  if(to.meta.requireAuthenticate){
    var tokenOk = await Util.varifyToken()
    if(!tokenOk){
     return gotoAuthorize()
    }
    if(!store.state.user.id){
      await Util.getUserInfo(router.app)
    }
    if(to.path=="/album_pics"){
      if(!store.state.album.currentAlbum){
        next({
          name:'home_index'
        })
      }
    }

  }else{
    if(to.name == 'oauthBack'){
      var tokenOk =await Util.varifyToken()
      if(!tokenOk){
        if(to.query.code){
         await Util.requestAccessToken(to.query.code).then(res=>{
            if(res.status == 'error'){
              if(err){
                next({
                  name:'error',
                  params:{
                    message:'getTokenError'
                  }
                })
              }
            }else{
              Util.setToken(res.data)
            }
          })
        }else{
          next({
            name:'error',
            params:{
              message:'Code undefined'
            }
          })
        }
      }
    }else{
    
    }
  }
  next()
})

router.afterEach((to)=>{
  iView.LoadingBar.finish()
  window.scrollTo(0,0)
})

function gotoAuthorize(){
  const url = `${AppConfig.oauthHost}/oauth/authorize?client_id=${AppConfig.client_id}&response_type=code&redirect_uri=${AppConfig.host}/oauth/callback`
  console.log(url)
  window.location.href=url
}