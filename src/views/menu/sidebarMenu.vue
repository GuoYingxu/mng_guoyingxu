<style lang="less">
    @import './menu.less';
</style>

<template lang='pug'>
    Menu(ref="sideMenu" :active-name="activeName" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu")
      template(v-for="item in menuList")
        MenuItem(v-if="item.children.length<=1" :name="item.children[0].name" :key="'menuitem' + item.name")
          Icon(:type="item.children[0].icon || item.icon" :size="iconSize" :key="'menuicon' + item.name")
          span(class="layout-text" :key="'title' + item.name") {{ itemTitle(item.children[0]) }}
        //- Submenu(v-if="item.children.length > 1" :name="item.name" :key="item.name")
        //-     template(slot="title")
        //-     Icon(:type="item.icon" :size="iconSize")
        //-     span(class="layout-text") {{ itemTitle(item) }}
        //-     template(v-for="child in item.children")
        //-         MenuItem(:name="child.name" :key="'menuitem' + child.name")
        //-         Icon(:type="child.icon" :size="iconSize" :key="'icon' + child.name")
        //-         span(class="layout-text" :key="'title' + child.name") {{ itemTitle(child) }}
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    computed:{
        activeName(){
            return this.$route.activeName || this.$route.name
        }
    },
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
        },
        itemTitle (item) {
            return item.meta.title;
        }
    },
    watch:{
        $route(val){
            console.log(val.name)
        }
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>