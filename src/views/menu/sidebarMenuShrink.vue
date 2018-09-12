<template lang="pug">
  div
    template(v-for="(item,index) in menuList")
      div(style='{textAlign:"center"}' :key='index')
        Dropdown(transfer v-if='item.children.length!==1' placement = 'right-start' :key ='index' @on-click = 'changeMenu')
          Button(style="{width:'70px',marginLeft: '-5px',padding:'10px 0'}" type="text")
            Icon(:size="20" :color="iconColor" :type="item.icon")
          DropdownMenu(style="{width:'200px'}" slot='list')
            template(v-for="(child,i) in item.children")
              DropdownItem(:name="child.name" :key="i")
                Icon(:type="child.icon")
                span(style="{paddingLeft:'10px'}") {{itemTitle(child)}}
        Dropdown(transfer v-else placement="right-start" :key='index' @on-click="changeMenu")
          Button(@click='chagneMenu(item.children[0].name)' style='width: 70px;margin-left:-5px;padding:10px 0' type='text')
            Icon(:size='20' :color="iconColor" :type="item.children[0].icon || item.icon")
          DropdownMenu(style="width:200px" slot='list')
            DropdownItem(:name="item.children[0].name" :key="'d'+index")
              Icon(:type='item.children[0].icon ||item.icon')
              span(style="padding-left:10px") {{itemTitle(item.children[0])}}
</template>
<script>
export default {
  name:'sidebarMenuShrink',
  props:{
    menuList:{
      type:Array
    },
    iconColor:{
      type:String,
      default:'white'
    },
    menuTheme:{
      type:String,
      default:'dark'
    }
  },
  methods:{
    changeMenu(active){
      this.$emit('on-change',active)
    },
    itemTitle(item){
      if(typeof item.title === 'object'){
        return item.title.title
      }else{
        return item.title
      }
    }
  }

}
</script>
