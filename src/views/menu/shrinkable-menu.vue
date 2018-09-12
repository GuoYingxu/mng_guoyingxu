<style lang="less">
  @import './menu.less';
</style>
<template lang="pug">
  .ivu-shrinkable-menu
    slot(name="top")
    sidebar-menu(v-show= '!shrink' :open-names='openNames' :menu-list='menuList' @on-change="handleChange")
    sidebar-menu-shrink(:menu-list="menuList" v-show="shrink" :icon-color='shrinkIconColor' @on-change='handleChange')
</template>
<script>
import sidebarMenu from './sidebarMenu'
import sidebarMenuShrink from './sidebarMenuShrink'
import util from '@/libs/util'
export default {
  name:'shrinkableMenu',
  components:{
    sidebarMenu,
    sidebarMenuShrink
  },
  props:{
    menuList:{
      type:Array,
      required:true
    },
    shrink:{
      type:Boolean,
      default:false
    },
    theme:{
      type:String,
      default:'dark',
      validator(val){
        return util.oneOf(val,['dark','light'])
      }
    },
    beforePush:{
      type:Function
    },
    openNames:{
      type:Array
    }
  },
  methods:{
    handleChange(name){
      let willpush = true
      if(this.beforePush!== undefined){
        if(!this.beforePush(name)){
          willpush =false
        }
      }
      if(willpush){
        this.$router.push({
          name:name
        })
      }
      this.$emit('on-change',name)
    }
  },
  computed:{
    bgColor(){
      return this.theme == 'dark' ? '#495060':'#fff'
    },
    shrinkIconColor(){
      return this.theme === 'dark' ? '#fff': '#495060'
    }
  }
}
</script>
