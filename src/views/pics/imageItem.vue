<template lang="pug">
  .image-item
    img(:src='item.url')
</template>

<script>
export default {
  props:['item']
}
</script>
<style lang="less" scoped>
.image-item{
  width:200px;
  height:160px;
  border:1px solid gray;
  overflow: hidden;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  margin:10px;
  img{
    width: 200px;
  }
}
</style>
