<template lang="pug">
  .main(:class="{'main-hide-text':shrink}")
    .sidebar-menu-con(:style="{width:shrink?'60px':'200px',overflow:shrink? 'visible':'auto'}")
      scroll-bar(ref='scrollBar')
        shrinkable-menu(
          :shrink='shrink',
          @on-change='handleSubmenuChange',
          :before-push='beforePush',
          :open-name='openedSubmenuArr',
          :menu-list ='menuList'
          )
          .logo-con(slot='top')
            img(v-show="!shrink" src='../assets/logo.jpg' key="max-logo")
            img(v-show='shrink' src='../assets/logo-min.jpg' key='min-logo')
    .main-header-con(:style="{paddingLeft:shrink?'60px':'200px'}")
      .main-header
        .navicon-con
          Button(:style="{transform:'rotateZ('+(shrink ? '-90':'0')+'deg'}" type="text" @click='toggleClick')
            Icon(type='navicon' size='32')
        .header-middle-con
          .main-breadcrumb
            breadcrumnb-nav(:currentPath="currentPath")
        .header-avator-con
          .user-dropdown-menu-con
            Row(type='flex' justify='end' align='middle' class='user-dropdown-innercon')
              Dropdown(transfer trigger="click" @on-click="handleClickUserDropdown")
                a(href="javascript:void(0)")
                  span.main-user-name {{userName}}
                  Icon(type="arrow-down-b")
                DropdownMenu(slot='list')
                  DropdownItem(name="ownSpace") 个人中心
                  DropdownItem(name="loginout" divided) 退出登录
                Avatar(:src="avatorPath" style="background:#619fe7;margin-left:10px")
    .single-page-con(:style="{left:shrink?'60px':'200px'}")
      .single-page
        router-view
</template>
<style lang="less">
 @import './main.less';
</style>

<script>
import shrinkableMenu from '@/views/menu/shrinkable-menu'
import scrollBar from '@/views/my-components/scroll-bar/vue-scroller-bars'
import breadcrumnbNav  from '@/views/main/breadcrumb-nav'
import {mapState} from 'vuex'
import Util from '../libs/util.js'
import util from '../libs/util.js';
export default {
  components:{
    shrinkableMenu,
    scrollBar,
    breadcrumnbNav
  },
  data(){
    return {
      shrink:false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr
    }
  },
  computed:{
    ...mapState({
      userName: state =>state.user.nickname
    }),
    menuList(){
      return this.$store.state.app.menuList
    },
    currentPath(){
      return this.$store.state.app.currentPath
    },
    avatorPath(){
      return localStorage.avatorImgPath;
    }
  },
  watch:{
    "$route"(to){
      this.$store.commit('SET_CURRENTPAGENAME',to.name)
      Util.setCurrentPath(this,to.name)
    }
  },
  methods:{
    beforePush(name){
      return true
    },
    handleSubmenuChange(){
      
    },
    toggleClick(){
      this.shrink =!this.shrink
    },
    handleClickUserDropdown(name){
      if(name=='ownSpace'){
        util.openNewPage(this,'ownspace_index');
        this.$router.push({
          name:'ownspace_index'
        })
      }else if(name=='loginout'){
        util.clearToken()
        this.$router.push('/login')
        // this.$store.commit('logout',this)
        // this.$store.commit('clearOpenedSubmenu')
        // this.$store.push({
        //   name:'login'
        // })
      }
    }
  }
}
</script>
