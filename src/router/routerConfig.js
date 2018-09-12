import Main from '@/views/Main.vue'
import p404 from '@/views/error-page/404.vue'
export const loginRouter = {
  path:'/login',
  name:'login',
  meta:{
    title: 'login-登录'
  },
  component:()=> import('@/views/login.vue')
}

export const page404 = {
  path:'/*',
  name:'error-404',
  meta: {
    title:'404-页面不存在',
  },
  component:p404
}

export const page403 = {
  path:'/403',
  name:'error-403',
  meta: {
    title:'403-权限不足'
  },
  component:() => import('@/views/error-page/403.vue')
}

export const page500 = {
  path:'/500',
  name:'error-500',
  meta:{
    title:'500-服务器错误'
  },
  component:()=>import('@/views/error-page/500.vue')
}

export const otherRouter = {
  path:'/',
  name:'otherRouter',
  redirect:'/home',
  component:Main,
  children:[
    {
      path:'/home',
      meta:{
        title:'home',
        requireAuthenticate:true
      },
      name:'home_index',
      component: ()=>import('@/views/home/home.vue')
    },
    {
      path:'/album_pics/:id',
      meta:{
        title:'图片',
        requireAuthenticate:true
      },
      activeName:'albums_index',
      name:'albums_list',
      component:()=>import('@/views/album/pics.vue')
    }
  ]
}
export const oauthRouter = {
  path:'/oauth/callback',
  name:'oauthBack',
  meta:{
    title:'oauth',
  },
  component:()=> import('@/views/oauth/callback.vue')
  
}
export const logout = {
  path:'/logout',
  name: 'logout',
  meta:{
    title:'logout'
  },
  component:()=> import('@/views/logout.vue')
}
export const error = {
  path:'/error',
  name:'error',
  meta:{
    title:'error',
  },
  component:()=> import('@/views/error-page/error.vue')
}

export const appRouter = [
  {
    path:'/user',
    name:'user',
    meta:{
      title:"用户管理",
      requireAuthenticate:true
    },
    component: Main,
    icon:'earth',
    children:[
      {
        path:'index',
        meta:{
          title:'用户管理',
          requireAuthenticate:true
        },
        name:'user_index',
        component:()=> import('@/views/user/index.vue')
      }
    ]
  },

  //相册
  {
    path:'/albums',
    name:'albums',
    meta:{
      title:'影集',
      requireAuthenticate:true,
    },
    icon:'earth',
    component:Main,
    children:[
      {
        path:'index',
        meta:{
          title:'影集',
          requireAuthenticate:true
        },
        name:'albums_index',
        component:()=> import('@/views/album/index.vue')
      },
    
    ]
  },
   //组织
   {
    path:'/teams',
    name:'teams',
    meta:{
      title:'组织',
      requireAuthenticate:true,
    },
    icon:'earth',
    component:Main,
    children:[
      {
        path:'index',
        meta:{
          title:'组织',
          requireAuthenticate:true
        },
        name:'teams_index',
        component:()=> import('@/views/team/index.vue')
      }
    ]
  },
  {
    path:'/pics',
    name:'pics',
    meta:{
      title:'图片',
      requireAuthenticate:true
    },
    icon:'earth',
    component:Main,
    children:[
      {
        path:'index',
        meta:{
          title:'图片',
          requireAuthenticate: true
        },
        name:'pics_index',
        component:()=> import('@/views/pics/index.vue')
      } 
    ]
  }
]
export const routers = [
  loginRouter,
  ...appRouter,
  otherRouter,
  oauthRouter,
  error,
  logout,
  page404,
]