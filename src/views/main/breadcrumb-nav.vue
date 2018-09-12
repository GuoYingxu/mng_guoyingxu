<template lang="pug">
  Breadcrumb
    BreadcrumbItem(
      v-for='item in currentPath'
      :href='item.path'
      :key="item.name"
    ) {{itemTitle(item)}}

</template>
<script>
export default {
  name:'breadcrumbNav',
  props:{
    currentPath:Array
  },
  methods:{
    itemTitle(item){
      console.log(item)
      return item.title || item.meta.title
    }
  }
}
</script>
