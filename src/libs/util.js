import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
// import env from '../../build/env'
// import semver from 'semver'
// import packjson from '../../package.json'
import { Config } from '../config';
import { routers } from '../router/routerConfig';

let util = {

}



util.title = (title,vm)=>{
  let iTitle = 'iView admin'
  if(title){
    iTitle += '-'+title
  }
  window.document.title = iTitle
}

util.inOf = (arr , targetArr) =>{
  let res =true;
  arr.forEach(element => {
    if(targetArr.indexOf(element) < 0){
      res =false
    }
  });
  return res
}

util.oneOf = (ele,targetArr) =>{
  return targetArr.indexOf(ele) >=0
}  

// util.showThisRoute 

util.setCurrentPath = (vm,name)=>{
  let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path+ '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('SET_CURRENTPATH', currentPathArr);

    return currentPathArr;
}
util.getRouterObjByName= (routers,name)=>{
  if(!name || !routers || !routers.length){
    return null
  }
  let routerObj= null
  for(let item of routers){
    if(item.name === name){
      return item
    }
    routerObj = util.getRouterObjByName(item.children,name)
    if(routerObj){
      return routerObj
    }
  }
  return null
}

util.requestAccessToken = (code,callback) =>{
  const url =`${Config[process.env.NODE_ENV].oauthHost}/oauth/token`
  return axios({
    url:url,
    method:'post',
    data:qs.stringify({
      client_id: Config[process.env.NODE_ENV].client_id,
      client_secret:'guoyingxu',
      code:code,
      grant_type:'authorization_code'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
}
util.getUserInfo = (vm)=>{
  const url = `${Config[process.env.NODE_ENV].oauthHost}/api/user`
  return  util.api.get('/api/user/userInfo?').then((res)=>{
    console.log(res)
    vm.$store.commit("SET_USER",res.data)
  }).catch(err=>{
    console.log(err)
  })
}
util.refreshToken = (refreshToken)=>{
  const url = `${Config[process.env.NODE_ENV].oauthHost}/oauth/token`
  return axios({
    url:url,
    method:'post',
    data:qs.stringify({
      client_id:Config[process.env.NODE_ENV].client_id,
      client_secret:'guoyingxu',
      refresh_token:refreshToken,
      grant_type:'refresh_token'
    }),
    headers:{
      'Content-Type':'application/x-www-form-urlencoded',
    }
  }).catch(err=>{
    // console.log("========================"err.response,err.message)
    console.log(err.response)
    return err.response
  })
}
util.getToken = ()=>{
  return Cookies.get('accessToken')
}
util.isNull=(param)=>{
  return param =='undefined' ||  param == 'null' || param =='NaN' || !param
}
util.varifyToken = async ()=>{
  const accessToken = Cookies.get('accessToken')
  const accessTokenExpiresAt = Cookies.get('accessTokenExpiresAt')
  const refreshToken = Cookies.get('refreshToken')
  console.log(accessToken,accessTokenExpiresAt,refreshToken)
  if(util.isNull(accessToken) || util.isNull(accessTokenExpiresAt) || util.isNull(refreshToken)) {
    return false
  }
  if(Date.now() > parseInt(accessTokenExpiresAt)){
    console.log("-----accessTokenExpired,refreshToken -----")
    let res = await util.refreshToken(refreshToken)
    console.log("+++++++++++++",res)
    if(res.code>=400){
      util.clearToken()
      return false
    }else{
      util.setToken(res.data)
    }
    return true
  }
  return  true
}
util.handleTitle = (vm,item)=>{
  return item.meta.title
}
util.setToken = async(token) => { 
   await Cookies.set('accessToken',token.accessToken)
   await Cookies.set('accessTokenExpiresAt',new Date(token.accessTokenExpiresAt).getTime())
   await Cookies.set('refreshToken',token.refreshToken)
   await Cookies.set('refreshTokenExpiresAt',new Date(token.refreshTokenExpiresAt).getTime())
   await Cookies.set('client',token.client)
   await Cookies.set('user',token.user)
  
}

util.clearToken = ()=>{
  Cookies.remove('accessToken')
  Cookies.remove('accessTokenExpiresAt')
  Cookies.remove('refreshToken')
  Cookies.remove('refreshTokenExpiresAt')
  Cookies.remove('client')
  Cookies.remove('user')
}
const Gxios = axios.create({
  baseURL:`${Config[process.env.NODE_ENV].oauthHost}/`,
  timeout: 1000
})
Gxios.interceptors.request.use(async (config)=>{
  if(config.url.indexOf('/api/') >=0){
    var tokenOk = await util.varifyToken()
    if(tokenOk){
      config.headers['Authorization'] = 'Bearer '+ util.getToken()
    }
    return config
  }else{
    return config
  }
},err=>{
  return Promise.reject(err).catch(err=>{
    console.log("====request error")
    return {
      code:err.code,
      status:'error',
      message:err.message
    }
  })
})
// Gxios.interceptors.response.use(response=>{
//   console.log(response)
//   return response
// },err=>{
//   return Promise.reject(err).catch(err=>{
//     console.log(err)
//     console.log('======response err',JSON.stringify(err))
//     return {
//       code:err.code,
//       status: "error",
//       message:err.message
//     }
//   })
// })
util.api = Gxios
export default util